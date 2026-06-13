/**
 * SEO-OS Orchestrator
 * This script handles the execution of SEO agents via a status-driven pipeline.
 */

import { getPerformanceReport, requestIndexing, getMissingUrls } from './analytics-engine';
import { 
  performDeepResearch, 
  generateAIPost, 
  generateGlossaryEntry,
  reviewContent,
  performComprehensiveAudit,
  optimizeExistingPage,
  performKeywordResearch,
  checkGoogleNews
} from './ai-engine';
import { getRoadmap, saveRoadmap, PipelineStep, RoadmapData, RoadmapTask, updateRoadmapWithNewTasks } from './roadmap-engine';
import { getAuditReport, saveAuditReport } from './audit-engine';
import { injectContextualLinks } from './linking-engine';
import { publishArticle } from './publisher-engine';
import { logAgentAction } from './log-engine';
import { performTechnicalAudit } from './technical-engine';
import { delegateAuditTasks } from './ai-engine';
import { saveContentOverride, getDynamicPosts } from './article-engine';

function updateStep(pipeline: PipelineStep[] | undefined, agent: string, status: PipelineStep['status'], message: string): PipelineStep[] {
  const steps = pipeline || [];
  return steps.map(s => s.agent === agent ? { ...s, status, message, completedAt: status === 'completed' ? new Date().toISOString() : s.completedAt } : s);
}

// Handler: Article Workflow with keyword research, SEO titles, and 1-per-day scheduling
async function handleArticleWorkflow(task: RoadmapTask, roadmap: RoadmapData): Promise<boolean> {
    if (!task.rawContent) {
        // KEYWORD RESEARCH PHASE: research first like a human would
        task.pipeline = updateStep(task.pipeline, 'Writer Agent', 'active', 'Researching keywords and news...');
        await saveRoadmap(roadmap);

        const { BLOG_POSTS } = await import('@/lib/blogData');
        const existingSlugs = BLOG_POSTS.map(p => p.slug);
        const research = await performKeywordResearch(task.keyword, existingSlugs);
        const news = await checkGoogleNews(task.keyword);
        const newsContext = news.slice(0, 3).map(n => `${n.title} (${n.source})`).join('; ');
        const seoTitle = research.seoTitle || task.keyword;

        await logAgentAction('Research Agent', 'success', `Keyword: ${research.keyword} | Title: ${seoTitle} | News: ${news.length > 0 ? 'Found' : 'None'}`);

        task.pipeline = updateStep(task.pipeline, 'Writer Agent', 'active', `Writing: ${seoTitle}`);
        await saveRoadmap(roadmap);

        const content = await generateAIPost(task.keyword, seoTitle, newsContext);
        if (!content) throw new Error('Writer Agent failed');
        task.rawContent = content;
        task.keyword = seoTitle;
        task.pipeline = updateStep(task.pipeline, 'Writer Agent', 'completed', 'Drafted.');
        await saveRoadmap(roadmap);
        return true;
    }
    if (task.rawContent && !task.reviewedContent) {
        task.pipeline = updateStep(task.pipeline, 'Review Agent', 'active', 'Reviewing...');
        await saveRoadmap(roadmap);
        const { approved, feedback, finalContent } = await reviewContent(task.rawContent);
        if (approved) {
            task.reviewedContent = finalContent;
            task.pipeline = updateStep(task.pipeline, 'Review Agent', 'completed', 'Approved.');
        } else {
            task.rawContent = null;
            task.pipeline = updateStep(task.pipeline, 'Writer Agent', 'pending', `Retry: ${feedback}`);
            task.pipeline = updateStep(task.pipeline, 'Review Agent', 'pending', 'Awaiting fixes.');
        }
        await saveRoadmap(roadmap);
        return true;
    }
    if (task.reviewedContent && !task.finalContent) {
        task.pipeline = updateStep(task.pipeline, 'Linking Agent', 'active', 'Linking...');
        await saveRoadmap(roadmap);
        task.finalContent = injectContextualLinks(task.reviewedContent!);
        task.pipeline = updateStep(task.pipeline, 'Linking Agent', 'completed', 'Links added.');
        await saveRoadmap(roadmap);
        return true;
    }
    if (task.finalContent && !task.publishedUrl) {
        // 1-ARTICLE-PER-DAY SCHEDULING: check if a post was published in the last 24 hours
        const dynamicPosts = await getDynamicPosts();
        if (dynamicPosts.length > 0) {
            const lastPost = dynamicPosts[0];
            const lastDate = new Date(lastPost.updatedAt || lastPost.date);
            const hoursSinceLastPost = (Date.now() - lastDate.getTime()) / (1000 * 60 * 60);
            if (hoursSinceLastPost < 24) {
                const nextAvailable = new Date(lastDate.getTime() + 24 * 60 * 60 * 1000);
                await logAgentAction('Publish Agent', 'idle', `Waiting until ${nextAvailable.toLocaleString()} for next article (1/day drip feed).`);
                return false;
            }
        }

        task.pipeline = updateStep(task.pipeline, 'Publish Agent', 'active', 'Deploying...');
        await saveRoadmap(roadmap);
        const slug = task.keyword.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
        const res = await publishArticle(slug, task.keyword, task.finalContent, 'Risk Management');
        if (res.success) {
            task.status = 'completed';
            task.publishedUrl = res.url;
            task.pipeline = updateStep(task.pipeline, 'Publish Agent', 'completed', `Live: ${res.url}`);
            await saveRoadmap(roadmap);
            await requestIndexing(`https://usmantrades.co.uk${res.url}`);
        }
        return true;
    }
    return false;
}

// Handler: Glossary Workflow
async function handleGlossaryWorkflow(task: RoadmapTask, roadmap: RoadmapData): Promise<boolean> {
    if (!task.rawContent) {
        task.pipeline = updateStep(task.pipeline, 'Glossary Agent', 'active', 'Defining...');
        await saveRoadmap(roadmap);
        const content = await generateGlossaryEntry(task.keyword);
        if (!content) throw new Error('Glossary Agent failed');
        task.rawContent = content;
        task.reviewedContent = content;
        task.pipeline = updateStep(task.pipeline, 'Glossary Agent', 'completed', 'Defined.');
        await saveRoadmap(roadmap);
        return true;
    }
    if (task.reviewedContent && !task.publishedUrl) {
         task.pipeline = updateStep(task.pipeline, 'Publish Agent', 'active', 'Deploying...');
         await saveRoadmap(roadmap);
         const slug = task.keyword.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
         const res = await publishArticle(slug, task.keyword, task.reviewedContent, 'Glossary');
         if (res.success) {
            task.status = 'completed';
            task.publishedUrl = res.url;
            task.pipeline = updateStep(task.pipeline, 'Publish Agent', 'completed', `Live: ${res.url}`);
            await saveRoadmap(roadmap);
            await requestIndexing(`https://usmantrades.co.uk${res.url}`);
         }
         return true;
    }
    return false;
}

// Handler: Optimization Workflow
// CRITICAL: This modifies existing pages — it does NOT create new articles.
// Optimized content is persisted to Redis so it actually takes effect on the live site.
async function handleOptimizationWorkflow(task: RoadmapTask, roadmap: RoadmapData): Promise<boolean> {
    task.pipeline = updateStep(task.pipeline, 'Review Agent', 'active', `Optimizing existing page for: ${task.keyword}`);
    await saveRoadmap(roadmap);

    // Extract slug from URL-like keyword (e.g. "/blog/posts/bitcoin-risk-management" → "bitcoin-risk-management")
    const blogMatch = task.keyword.match(/\/blog\/posts\/(.+)/);
    const slug = blogMatch ? blogMatch[1] : null;

    const { BLOG_POSTS } = await import('@/lib/blogData');
    const existingPost = slug ? BLOG_POSTS.find(p => p.slug === slug) : null;

    const optimizationType = task.task_type === 'FIX_AEO' ? 'AEO (Answer Engine Optimization)' :
                             task.task_type === 'FIX_GEO' ? 'GEO (Geographic Optimization)' :
                             task.task_type === 'FIX_KEYWORDS' ? 'Keyword gap and semantic optimization' :
                             task.task_type === 'FIX_TECHNICAL' ? 'Technical SEO' :
                             task.task_type === 'FIX_MEDIA' ? 'Media and image optimization' :
                             'On-page SEO optimization';

    if (existingPost && existingPost.content) {
      const optimizedContent = await optimizeExistingPage(task.keyword, existingPost.content, optimizationType);
      if (optimizedContent) {
        await saveContentOverride(slug!, { content: optimizedContent });
        task.pipeline = updateStep(task.pipeline, 'Review Agent', 'completed', `Page optimized and saved to Redis for slug: ${slug}.`);
      } else {
        task.pipeline = updateStep(task.pipeline, 'Review Agent', 'completed', 'Optimization returned no content.');
      }
    } else if (slug && !existingPost) {
      task.pipeline = updateStep(task.pipeline, 'Review Agent', 'completed', `No blog post found for slug: ${slug}. Skipped.`);
    } else {
      task.pipeline = updateStep(task.pipeline, 'Review Agent', 'completed', `Non-blog page (${task.keyword}), no content to optimize. Skipped.`);
    }

    task.pipeline = updateStep(task.pipeline, 'Submission Agent', 'active', 'Pinging GSC...');
    await saveRoadmap(roadmap);
    await requestIndexing(`https://usmantrades.co.uk/`);
    task.status = 'completed';
    task.completedAt = new Date().toISOString();
    task.pipeline = updateStep(task.pipeline, 'Submission Agent', 'completed', 'Re-index requested.');
    await saveRoadmap(roadmap);
    return true;
}

export async function runDailyCycle(isManual: boolean = false) {
  const roadmap = await getRoadmap();

  if (roadmap?.systemStatus === 'paused') {
    await logAgentAction('System', 'idle', 'Autopilot is paused.');
    return { success: false, error: 'System is paused' };
  }

  // 1. PROACTIVE RESEARCH (Always active check)
  try {
    const currentRoadmap = await getRoadmap();
    if (currentRoadmap) {
      const lastUpdate = new Date(currentRoadmap.updatedAt).getTime();
      const oneHourAgo = Date.now() - (60 * 60 * 1000);

      if (lastUpdate < oneHourAgo) {
        await logAgentAction('Monitor Agent', 'active', 'Running proactive opportunity research...');
        const gscData = await getPerformanceReport();
        await performTechnicalAudit();
        const audit = await performComprehensiveAudit(gscData);
        await saveAuditReport({ ...audit, timestamp: new Date().toISOString() });
        const newTasks = await delegateAuditTasks(audit);
        await updateRoadmapWithNewTasks(newTasks);
        await logAgentAction('Audit Agent', 'success', `Audit complete. Delegated ${newTasks.length} tasks.`);
      }
    }
  } catch (researchError: any) {
    console.error('[Orchestrator] Proactive research failed (non-fatal):', researchError.message);
    await logAgentAction('Orchestrator', 'error', `Research skipped: ${researchError.message}`);
  }

  // 2. AUTONOMOUS EXECUTION LOOP
  const validTaskTypes = ['CREATE_CONTENT', 'FIX_AEO', 'FIX_GEO', 'FIX_MEDIA', 'FIX_KEYWORDS', 'FIX_TECHNICAL', 'GLOSSARY_ENTRY', 'TOOL_IMPROVEMENT'];

  // Phase A: Initialize pipelines for all pending tasks
  let tasksUpdated = false;
  const refreshedRoadmap = await getRoadmap();
  if (!refreshedRoadmap || refreshedRoadmap.systemStatus === 'paused') return { success: false, error: 'Paused' };

  refreshedRoadmap.tasks.sort((a, b) => a.day - b.day);

  refreshedRoadmap.tasks.forEach(task => {
    if (!task.task_type || !validTaskTypes.includes(task.task_type)) {
      task.task_type = 'CREATE_CONTENT';
      tasksUpdated = true;
    }
    if (task.status === 'pending' && (!task.pipeline || task.pipeline.length === 0)) {
      if (task.task_type === 'GLOSSARY_ENTRY') {
        task.pipeline = [
          { agent: 'Glossary Agent', status: 'pending', message: 'Generating definition.' },
          { agent: 'Publish Agent', status: 'pending', message: 'Waiting for deployment.' }
        ];
      } else if (task.task_type.startsWith('FIX_') || task.task_type === 'TOOL_IMPROVEMENT') {
        task.pipeline = [
          { agent: 'Review Agent', status: 'pending', message: 'Running optimization.' },
          { agent: 'Submission Agent', status: 'pending', message: 'Waiting to request re-index.' }
        ];
      } else if (task.task_type === 'CREATE_CONTENT') {
        task.pipeline = [
          { agent: 'Research Agent', status: 'pending', message: 'Keyword research phase.' },
          { agent: 'Writer Agent', status: 'pending', message: 'Writing phase.' },
          { agent: 'Review Agent', status: 'pending', message: 'Editorial loop.' },
          { agent: 'Linking Agent', status: 'pending', message: 'Internal linking.' },
          { agent: 'Publish Agent', status: 'pending', message: 'Live deployment.' }
        ];
      }
      tasksUpdated = true;
    }
  });
  if (tasksUpdated) await saveRoadmap(refreshedRoadmap);

  // Phase B: Process all FIX_* tasks first (batch optimizations are fast)
  const fixTasks = refreshedRoadmap.tasks.filter(t => t.status === 'pending' && (t.task_type.startsWith('FIX_') || t.task_type === 'TOOL_IMPROVEMENT'));
  for (const fixTask of fixTasks) {
    let actionTaken = false;
    try {
      switch (fixTask.task_type) {
        case 'FIX_AEO': case 'FIX_GEO': case 'FIX_KEYWORDS':
        case 'FIX_TECHNICAL': case 'FIX_MEDIA': case 'TOOL_IMPROVEMENT':
          actionTaken = await handleOptimizationWorkflow(fixTask, refreshedRoadmap);
          break;
        default:
          fixTask.status = 'failed';
          await saveRoadmap(refreshedRoadmap);
      }
    } catch (e: any) {
      console.error(`[Dispatcher] Fatal Error on task ${fixTask.keyword}: ${e.message}`);
      fixTask.status = 'failed';
      await saveRoadmap(refreshedRoadmap);
    }
  }

  // Phase C: Process at most ONE article (subject to 24-hour drip feed)
  const articleTask = refreshedRoadmap.tasks.find(t => t.status === 'pending' && t.task_type === 'CREATE_CONTENT');
  if (articleTask) {
    try {
      await handleArticleWorkflow(articleTask, refreshedRoadmap);
    } catch (e: any) {
      console.error(`[Dispatcher] Fatal Error on article ${articleTask.keyword}: ${e.message}`);
      articleTask.status = 'failed';
      await saveRoadmap(refreshedRoadmap);
    }
  }

  // Phase D: Process at most ONE glossary entry
  const glossaryTask = refreshedRoadmap.tasks.find(t => t.status === 'pending' && t.task_type === 'GLOSSARY_ENTRY');
  if (glossaryTask) {
    try {
      await handleGlossaryWorkflow(glossaryTask, refreshedRoadmap);
    } catch (e: any) {
      console.error(`[Dispatcher] Fatal Error on glossary ${glossaryTask.keyword}: ${e.message}`);
      glossaryTask.status = 'failed';
      await saveRoadmap(refreshedRoadmap);
    }
  }
}

export async function cleanupMissingUrls() {
  await logAgentAction('Submission Agent', 'active', 'Scanning for missing URLs...');
  const reports = await getPerformanceReport();
  const missingUrls = await getMissingUrls(reports);
  for (const url of missingUrls) {
    await requestIndexing(`https://usmantrades.co.uk${url}`);
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  await logAgentAction('Submission Agent', 'success', `Submitted ${missingUrls.length} missing URLs.`);
  return { success: true, submittedCount: missingUrls.length };
}
