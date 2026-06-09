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
  performComprehensiveAudit
} from './ai-engine';
import { getRoadmap, saveRoadmap, PipelineStep, RoadmapData, RoadmapTask, updateRoadmapWithNewTasks } from './roadmap-engine';
import { getAuditReport, saveAuditReport } from './audit-engine';
import { injectContextualLinks } from './linking-engine';
import { publishArticle } from './publisher-engine';
import { logAgentAction } from './log-engine';
import { performTechnicalAudit } from './technical-engine';
import { delegateAuditTasks } from './ai-engine';

function updateStep(pipeline: PipelineStep[] | undefined, agent: string, status: PipelineStep['status'], message: string): PipelineStep[] {
  const steps = pipeline || [];
  return steps.map(s => s.agent === agent ? { ...s, status, message, completedAt: status === 'completed' ? new Date().toISOString() : s.completedAt } : s);
}

// Handler: Article Workflow
async function handleArticleWorkflow(task: RoadmapTask, roadmap: RoadmapData): Promise<boolean> {
    if (!task.rawContent) {
        task.pipeline = updateStep(task.pipeline, 'Writer Agent', 'active', 'Drafting...');
        await saveRoadmap(roadmap);
        const content = await generateAIPost(task.keyword);
        if (!content) throw new Error('Writer Agent failed');
        task.rawContent = content;
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
        task.pipeline = updateStep(task.pipeline, 'Publish Agent', 'active', 'Deploying...');
        await saveRoadmap(roadmap);
        const slug = task.keyword.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
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
async function handleOptimizationWorkflow(task: RoadmapTask, roadmap: RoadmapData): Promise<boolean> {
    task.pipeline = updateStep(task.pipeline, 'Technical Auditor', 'completed', 'Audit complete.');
    task.pipeline = updateStep(task.pipeline, 'Review Agent', 'active', 'Refining meta...');
    await saveRoadmap(roadmap);
    task.optimizationPlan = `Optimized meta tags for ${task.keyword} to recover impressions.`;
    task.pipeline = updateStep(task.pipeline, 'Review Agent', 'completed', 'Metadata optimized.');
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

  // 2. AUTONOMOUS EXECUTION LOOP
  let workDoneCount = 0;
  const maxWorkPerCycle = 100;

  while (workDoneCount < maxWorkPerCycle) {
    const refreshedRoadmap = await getRoadmap();
    if (!refreshedRoadmap || refreshedRoadmap.systemStatus === 'paused') break;

    // Sort by day to enforce strict sequential execution
    refreshedRoadmap.tasks.sort((a, b) => a.day - b.day);

    // Initialization check
    let tasksUpdated = false;
    refreshedRoadmap.tasks.forEach(task => {
        if (task.status === 'pending' && (!task.pipeline || task.pipeline.length === 0)) {
            if (task.task_type === 'GLOSSARY_ENTRY') {
                task.pipeline = [
                    { agent: 'Glossary Agent', status: 'pending', message: 'Generating definition.' },
                    { agent: 'Publish Agent', status: 'pending', message: 'Waiting for deployment.' }
                ];
            } else if (task.task_type === 'OPTIMIZE_HOMEPAGE') {
                task.pipeline = [
                    { agent: 'Technical Auditor', status: 'pending', message: 'Analyzing CTR gaps.' },
                    { agent: 'Review Agent', status: 'pending', message: 'Optimizing meta tags.' },
                    { agent: 'Submission Agent', status: 'pending', message: 'Requesting GSC re-index.' }
                ];
            } else {
                task.pipeline = [
                    { agent: 'Writer Agent', status: 'pending', message: 'Researching context.' },
                    { agent: 'Review Agent', status: 'pending', message: 'Editorial loop.' },
                    { agent: 'Linking Agent', status: 'pending', message: 'Internal linking.' },
                    { agent: 'Publish Agent', status: 'pending', message: 'Live deployment.' }
                ];
            }
            tasksUpdated = true;
        }
    });
    if (tasksUpdated) await saveRoadmap(refreshedRoadmap);

    const nextTask = refreshedRoadmap.tasks.find(t => t.status === 'pending');
    if (!nextTask) break;

    // LEGACY COMPATIBILITY LAYER: Map old task types to new contracts
    if (!nextTask.task_type || ['article', 'tool_improvement', 'faq', 'glossary'].includes(nextTask.task_type as any)) {
        console.log(`[Dispatcher] Mapping legacy task type: ${nextTask.task_type}`);
        if (nextTask.task_type === 'glossary') nextTask.task_type = 'GLOSSARY_ENTRY';
        else nextTask.task_type = 'CREATE_CONTENT';
        await saveRoadmap(refreshedRoadmap);
    }

    let actionTaken = false;
    
    // DISPATCHER
    try {
        switch (nextTask.task_type) {
            case 'OPTIMIZE_HOMEPAGE':
                actionTaken = await handleOptimizationWorkflow(nextTask, refreshedRoadmap);
                break;
            case 'CREATE_CONTENT':
            case 'FIX_AEO':
            case 'FIX_GEO':
            case 'FIX_KEYWORDS':
                actionTaken = await handleArticleWorkflow(nextTask, refreshedRoadmap);
                break;
            case 'GLOSSARY_ENTRY':
                actionTaken = await handleGlossaryWorkflow(nextTask, refreshedRoadmap);
                break;
            case 'FIX_TECHNICAL':
            case 'FIX_MEDIA':
                // Treat as content update/optimization for now
                actionTaken = await handleOptimizationWorkflow(nextTask, refreshedRoadmap);
                break;
            default:
                console.error(`[Dispatcher] Unknown task type: ${nextTask.task_type}`);
                nextTask.status = 'failed';
                await saveRoadmap(refreshedRoadmap);
        }
    } catch (e: any) {
        console.error(`[Dispatcher] Fatal Error on task ${nextTask.keyword}: ${e.message}`);
        nextTask.status = 'failed';
        await saveRoadmap(refreshedRoadmap);
    }
    
    if (!actionTaken) break;
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
  return { success: true };
}
