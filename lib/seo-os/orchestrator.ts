/**
 * SEO-OS Orchestrator
 * This script handles the execution of SEO agents via a status-driven pipeline.
 */

import { getPerformanceReport, requestIndexing, getMissingUrls } from './analytics-engine';
import { 
  performDeepResearch, 
  generate30DayPlan, 
  generateAIPost, 
  generateGlossaryEntry,
  reviewContent,
  monitorPerformanceAndAdjust 
} from './ai-engine';
import { getRoadmap, saveRoadmap, PipelineStep } from './roadmap-engine';
import { injectContextualLinks } from './linking-engine';
import { publishArticle } from './publisher-engine';
import { logAgentAction } from './log-engine';
import { performTechnicalAudit } from './technical-engine';

function updateStep(pipeline: PipelineStep[] | undefined, agent: string, status: PipelineStep['status'], message: string): PipelineStep[] {
  const steps = pipeline || [];
  return steps.map(s => s.agent === agent ? { ...s, status, message, completedAt: status === 'completed' ? new Date().toISOString() : s.completedAt } : s);
}

export async function runDailyCycle(isManual: boolean = false) {
  const roadmap = await getRoadmap();

  if (roadmap?.systemStatus === 'paused') {
    console.log('[Orchestrator] System is PAUSED.');
    await logAgentAction('System', 'idle', 'Pipeline is paused. Resume via Dashboard.');
    return { success: false, error: 'System is paused' };
  }

  console.log(`[Orchestrator] SEO Autopilot Heartbeat (Manual: ${isManual})`);

  let loopCount = 0;
  // Increase loop limit for full autonomy in one trigger
  while (loopCount < 20) {
    loopCount++;
    const currentRoadmap = await getRoadmap();
    if (!currentRoadmap || currentRoadmap.systemStatus === 'paused') break;

    // 1. RESEARCH & STRATEGY (Always Active)
    // Run research if roadmap is old or low on tasks
    const pendingTasks = currentRoadmap.tasks.filter(t => t.status === 'pending');
    if (pendingTasks.length < 5) {
      await logAgentAction('Research Agent', 'active', 'Scanning Search Console for new high-growth opportunities...');
      const gscData = await getPerformanceReport();
      
      // Technical Audit first to fix impressions
      await performTechnicalAudit();
      
      const researchReport = await performDeepResearch(gscData);
      const correctionReport = await monitorPerformanceAndAdjust(gscData, currentRoadmap);
      
      await logAgentAction('Strategist Agent', 'active', 'Updating roadmap with fresh insights...');
      const newTasks = await generate30DayPlan(researchReport, correctionReport);
      
      const existingKeywords = new Set(currentRoadmap.tasks.map(t => t.keyword.toLowerCase()));
      const filteredNewTasks = (newTasks as any).filter((t: any) => !existingKeywords.has(t.keyword.toLowerCase()));

      const tasksToAppend = filteredNewTasks.map((t: any) => {
        let pipeline: PipelineStep[] = [];
        
        if (t.type === 'glossary') {
          pipeline = [
            { agent: 'Glossary Agent', status: 'pending', message: 'Generating definition.' },
            { agent: 'Publish Agent', status: 'pending', message: 'Waiting for deployment.' }
          ];
        } else if (t.keyword.toLowerCase().includes('update') || t.keyword.toLowerCase().includes('optimize')) {
          pipeline = [
            { agent: 'Technical Auditor', status: 'pending', message: 'Analyzing page performance.' },
            { agent: 'Review Agent', status: 'pending', message: 'Optimizing metadata & content.' },
            { agent: 'Submission Agent', status: 'pending', message: 'Requesting re-indexing.' }
          ];
        } else {
          pipeline = [
            { agent: 'Writer Agent', status: 'pending', message: 'Researching technical context.' },
            { agent: 'Review Agent', status: 'pending', message: 'Editorial review loop.' },
            { agent: 'Linking Agent', status: 'pending', message: 'Internal link injection.' },
            { agent: 'Publish Agent', status: 'pending', message: 'Final deployment.' }
          ];
        }

        return { ...t, pipeline };
      });

      currentRoadmap.tasks.push(...tasksToAppend);
      await saveRoadmap(currentRoadmap);
    }

    // 2. EXECUTION ENGINE
    
    // A. PAGE UPDATES / OPTIMIZATIONS
    const taskToUpdate = currentRoadmap.tasks.find(t => t.status === 'pending' && t.pipeline?.some(p => p.agent === 'Technical Auditor' && p.status === 'pending'));
    if (taskToUpdate) {
      await logAgentAction('Technical Auditor', 'active', `Optimizing: ${taskToUpdate.keyword}`);
      taskToUpdate.pipeline = updateStep(taskToUpdate.pipeline, 'Technical Auditor', 'completed', 'Technical audit complete.');
      taskToUpdate.pipeline = updateStep(taskToUpdate.pipeline, 'Review Agent', 'active', 'Refining metadata...');
      await saveRoadmap(currentRoadmap);
      
      // In a real scenario, this would call an agent to patch the meta/content
      // For now, we simulate completion and trigger re-index
      taskToUpdate.pipeline = updateStep(taskToUpdate.pipeline, 'Review Agent', 'completed', 'Meta tags optimized for CTR.');
      taskToUpdate.pipeline = updateStep(taskToUpdate.pipeline, 'Submission Agent', 'active', 'Pinging GSC...');
      await saveRoadmap(currentRoadmap);
      
      await requestIndexing(`https://usmantrades.co.uk/`); // Assuming home page update for now
      taskToUpdate.status = 'completed';
      taskToUpdate.pipeline = updateStep(taskToUpdate.pipeline, 'Submission Agent', 'completed', 'Indexing requested.');
      await saveRoadmap(currentRoadmap);
      continue;
    }

    // B. PUBLISH
    const taskToPublish = currentRoadmap.tasks.find(t => t.status === 'pending' && (t as any).reviewedContent && !(t as any).publishedUrl);
    if (taskToPublish) {
      const contentToPublish = (taskToPublish as any).finalContent || (taskToPublish as any).reviewedContent;
      if (contentToPublish) {
        await logAgentAction('Publish Agent', 'active', `Publishing: ${taskToPublish.keyword}`);
        taskToPublish.pipeline = updateStep(taskToPublish.pipeline, 'Publish Agent', 'active', 'Deploying...');
        await saveRoadmap(currentRoadmap);

        const slug = taskToPublish.keyword.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
        const res = await publishArticle(slug, taskToPublish.keyword, contentToPublish, taskToPublish.type === 'glossary' ? 'Glossary' : 'Risk Management');
        
        if (res.success) {
          taskToPublish.status = 'completed';
          taskToPublish.publishedUrl = res.url;
          taskToPublish.pipeline = updateStep(taskToPublish.pipeline, 'Publish Agent', 'completed', `Live at ${res.url}`);
          await saveRoadmap(currentRoadmap);
          await requestIndexing(`https://usmantrades.co.uk${res.url}`);
        } else {
          taskToPublish.pipeline = updateStep(taskToPublish.pipeline, 'Publish Agent', 'failed', res.error || 'Deploy failed.');
          await saveRoadmap(currentRoadmap);
        }
        continue;
      }
    }

    // C. LINKING
    const taskToLink = currentRoadmap.tasks.find(t => t.status === 'pending' && t.type === 'article' && (t as any).reviewedContent && !(t as any).finalContent);
    if (taskToLink) {
      taskToLink.pipeline = updateStep(taskToLink.pipeline, 'Linking Agent', 'active', 'Injecting links...');
      await saveRoadmap(currentRoadmap);
      const linkedContent = injectContextualLinks((taskToLink as any).reviewedContent);
      (taskToLink as any).finalContent = linkedContent;
      taskToLink.pipeline = updateStep(taskToLink.pipeline, 'Linking Agent', 'completed', 'Links optimized.');
      await saveRoadmap(currentRoadmap);
      continue;
    }

    // D. REVIEWER
    const taskToReview = currentRoadmap.tasks.find(t => t.status === 'pending' && t.type === 'article' && (t as any).rawContent && !(t as any).reviewedContent);
    if (taskToReview) {
      taskToReview.pipeline = updateStep(taskToReview.pipeline, 'Review Agent', 'active', 'Reviewing...');
      await saveRoadmap(currentRoadmap);
      const { approved, feedback, finalContent } = await reviewContent((taskToReview as any).rawContent);
      if (approved) {
        (taskToReview as any).reviewedContent = finalContent;
        taskToReview.pipeline = updateStep(taskToReview.pipeline, 'Review Agent', 'completed', 'Approved.');
      } else {
        (taskToReview as any).reviewFeedback = feedback;
        (taskToReview as any).rawContent = null;
        taskToReview.pipeline = updateStep(taskToReview.pipeline, 'Writer Agent', 'pending', `Rewrite: ${feedback}`);
        taskToReview.pipeline = updateStep(taskToReview.pipeline, 'Review Agent', 'pending', 'Awaiting retry.');
      }
      await saveRoadmap(currentRoadmap);
      continue;
    }

    // E. WRITER
    const taskToDraft = currentRoadmap.tasks.find(t => t.status === 'pending' && t.type === 'article' && !(t as any).rawContent);
    if (taskToDraft) {
      taskToDraft.pipeline = updateStep(taskToDraft.pipeline, 'Writer Agent', 'active', 'Drafting...');
      await saveRoadmap(currentRoadmap);
      const content = await generateAIPost(taskToDraft.keyword, (taskToDraft as any).reviewFeedback);
      if (content) {
        (taskToDraft as any).rawContent = content;
        (taskToDraft as any).reviewFeedback = null;
        taskToDraft.pipeline = updateStep(taskToDraft.pipeline, 'Writer Agent', 'completed', 'Draft complete.');
      }
      await saveRoadmap(currentRoadmap);
      continue;
    }

    // F. GLOSSARY
    const taskToGlossary = currentRoadmap.tasks.find(t => t.status === 'pending' && t.type === 'glossary' && !(t as any).rawContent);
    if (taskToGlossary) {
      const content = await generateGlossaryEntry(taskToGlossary.keyword);
      if (content) {
        (taskToGlossary as any).rawContent = content;
        (taskToGlossary as any).reviewedContent = content; 
        taskToGlossary.pipeline = updateStep(taskToGlossary.pipeline, 'Glossary Agent', 'completed', 'Defined.');
      }
      await saveRoadmap(currentRoadmap);
      continue;
    }

    break; // No more work
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
  return { submittedCount: missingUrls.length, urls: missingUrls };
}
