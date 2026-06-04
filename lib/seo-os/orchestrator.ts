/**
 * SEO-OS Orchestrator
 * This script handles the execution of SEO agents via a status-driven pipeline.
 */

import { getPerformanceReport, requestIndexing, getMissingUrls } from './analytics-engine';
import { 
  performDeepResearch, 
  generate30DayPlan, 
  generateAIPost, 
  reviewContent,
  monitorPerformanceAndAdjust 
} from './ai-engine';
import { getRoadmap, saveRoadmap, PipelineStep } from './roadmap-engine';
import { injectContextualLinks } from './linking-engine';
import { publishArticle } from './publisher-engine';
import { logAgentAction } from './log-engine';
import { performTechnicalAudit } from './technical-engine';

function updateStep(pipeline: PipelineStep[] | undefined, agent: string, status: PipelineStep['status'], message: string): PipelineStep[] {
  const steps = pipeline || [
    { agent: 'Writer Agent', status: 'pending', message: 'Awaiting research.' },
    { agent: 'Review Agent', status: 'pending', message: 'Awaiting draft.' },
    { agent: 'Linking Agent', status: 'pending', message: 'Awaiting polish.' },
    { agent: 'Publish Agent', status: 'pending', message: 'Awaiting deployment.' },
  ];

  return steps.map(s => s.agent === agent ? { ...s, status, message, completedAt: status === 'completed' ? new Date().toISOString() : s.completedAt } : s);
}

export async function runDailyCycle(isManual: boolean = false) {
  const roadmap = await getRoadmap();

  if (!isManual && roadmap?.systemStatus === 'paused') {
    console.log('[Orchestrator] System is PAUSED. Skipping cycle.');
    return;
  }

  console.log(`[Orchestrator] Professional SEO Pipeline Heartbeat (Manual: ${isManual})`);

  // Use a loop for manual triggers to execute the full pipeline automatically
  let shouldContinue = true;
  let loopCount = 0;

  while (shouldContinue && loopCount < 5) {
    loopCount++;
    const currentRoadmap = await getRoadmap();
    if (!currentRoadmap) break;

    const pendingTasks = currentRoadmap.tasks.filter(t => t.status === 'pending');
    const hasEnoughWork = pendingTasks.length >= 3;
    
    // 1. STRATEGY (When roadmap is low on work)
    if (!hasEnoughWork) {
      await logAgentAction('Monitor Agent', 'active', 'Workload low. Analyzing performance to find new gaps...');
      const gscData = await getPerformanceReport();
      const correctionReport = await monitorPerformanceAndAdjust(gscData, currentRoadmap);
      
      await logAgentAction('Research Agent', 'active', 'Scanning for fresh high-growth opportunities...');
      const researchReport = await performDeepResearch(gscData);
      
      await logAgentAction('Strategist Agent', 'active', 'Optimizing and expanding roadmap...');
      const newTasks = await generate30DayPlan(researchReport, correctionReport);
      
      // Merge new tasks without duplicates
      const existingKeywords = new Set(currentRoadmap.tasks.map(t => t.keyword.toLowerCase()));
      const filteredNewTasks = (newTasks as any).filter((t: any) => !existingKeywords.has(t.keyword.toLowerCase()));

      const tasksToAppend = filteredNewTasks.map((t: any) => ({
        ...t,
        pipeline: [
          { agent: 'Writer Agent', status: 'pending' as const, message: 'Waiting for research context.' },
          { agent: 'Review Agent', status: 'pending' as const, message: 'Waiting for content draft.' },
          { agent: 'Linking Agent', status: 'pending' as const, message: 'Waiting for final polish.' },
          { agent: 'Publish Agent', status: 'pending' as const, message: 'Waiting for deployment signal.' },
        ]
      }));

      currentRoadmap.tasks.push(...tasksToAppend);
      await saveRoadmap(currentRoadmap);
      await logAgentAction('Strategist Agent', 'success', `Roadmap expanded with ${tasksToAppend.length} new tasks.`);
      
      if (tasksToAppend.length > 0 && !isManual) return;
    }

    // 2. PIPELINE EXECUTION
    
    // A. PUBLISH
    const taskToPublish = currentRoadmap.tasks.find(t => t.status === 'pending' && (t as any).finalContent);
    if (taskToPublish) {
      await logAgentAction('Publish Agent', 'active', `Publishing: ${taskToPublish.keyword}`);
      taskToPublish.pipeline = updateStep(taskToPublish.pipeline, 'Publish Agent', 'active', 'Deploying to live environment...');
      await saveRoadmap(currentRoadmap);

      const slug = taskToPublish.keyword.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
      const res = await publishArticle(slug, taskToPublish.keyword, (taskToPublish as any).finalContent, 'Risk Management');
      
      if (res.success) {
        taskToPublish.status = 'completed';
        taskToPublish.completedAt = new Date().toISOString();
        taskToPublish.publishedUrl = res.url;
        taskToPublish.pipeline = updateStep(taskToPublish.pipeline, 'Publish Agent', 'completed', `Successfully live at ${res.url}`);
        await saveRoadmap(currentRoadmap);
        await logAgentAction('Publish Agent', 'success', `Live at ${res.url}`);
        await requestIndexing(`https://usmantrades.co.uk${res.url}`);
        shouldContinue = false; // Task fully completed
      } else {
        taskToPublish.pipeline = updateStep(taskToPublish.pipeline, 'Publish Agent', 'failed', res.error || 'Network error during deployment.');
        await saveRoadmap(currentRoadmap);
        shouldContinue = false;
      }
      if (!isManual) return;
      continue;
    }

    // B. LINKING
    const taskToLink = currentRoadmap.tasks.find(t => t.status === 'pending' && (t as any).reviewedContent && !(t as any).finalContent);
    if (taskToLink) {
      await logAgentAction('Linking Agent', 'active', `Linking: ${taskToLink.keyword}`);
      taskToLink.pipeline = updateStep(taskToLink.pipeline, 'Linking Agent', 'active', 'Analyzing internal graph for contextual links...');
      await saveRoadmap(currentRoadmap);

      const linkedContent = injectContextualLinks((taskToLink as any).reviewedContent);
      (taskToLink as any).finalContent = linkedContent;
      taskToLink.pipeline = updateStep(taskToLink.pipeline, 'Linking Agent', 'completed', 'Contextual links injected successfully.');
      await saveRoadmap(currentRoadmap);
      await logAgentAction('Linking Agent', 'success', 'Links optimized.');
      if (!isManual) return;
      continue;
    }

    // C. REVIEWER
    const taskToReview = currentRoadmap.tasks.find(t => t.status === 'pending' && (t as any).rawContent && !(t as any).reviewedContent);
    if (taskToReview) {
      await logAgentAction('Review Agent', 'active', `Reviewing: ${taskToReview.keyword}`);
      taskToReview.pipeline = updateStep(taskToReview.pipeline, 'Review Agent', 'active', 'Editing content for brand voice & accuracy...');
      await saveRoadmap(currentRoadmap);

      const { approved, finalContent } = await reviewContent((taskToReview as any).rawContent);
      if (approved) {
        (taskToReview as any).reviewedContent = finalContent;
        taskToReview.pipeline = updateStep(taskToReview.pipeline, 'Review Agent', 'completed', 'Editorial review passed.');
        await saveRoadmap(currentRoadmap);
        await logAgentAction('Review Agent', 'success', 'Approved by Editor.');
      } else {
        taskToReview.pipeline = updateStep(taskToReview.pipeline, 'Review Agent', 'failed', 'Content rejected for quality standards.');
        await saveRoadmap(currentRoadmap);
        shouldContinue = false;
      }
      if (!isManual) return;
      continue;
    }

    // D. WRITER
    const taskToDraft = currentRoadmap.tasks.find(t => t.status === 'pending' && !(t as any).rawContent);
    if (taskToDraft) {
      await logAgentAction('Writer Agent', 'active', `Drafting: ${taskToDraft.keyword}`);
      taskToDraft.pipeline = updateStep(taskToDraft.pipeline, 'Writer Agent', 'active', 'Generating technical market analysis draft...');
      await saveRoadmap(currentRoadmap);

      const content = await generateAIPost(taskToDraft.keyword);
      if (content) {
        (taskToDraft as any).rawContent = content;
        taskToDraft.pipeline = updateStep(taskToDraft.pipeline, 'Writer Agent', 'completed', 'Expert draft generated.');
        await saveRoadmap(currentRoadmap);
        await logAgentAction('Writer Agent', 'success', 'Draft complete.');
      } else {
        taskToDraft.pipeline = updateStep(taskToDraft.pipeline, 'Writer Agent', 'failed', 'OpenAI capacity error.');
        await saveRoadmap(currentRoadmap);
        shouldContinue = false;
      }
      if (!isManual) return;
      continue;
    }

    shouldContinue = false; // No more work found
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
