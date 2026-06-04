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

  try {
    // 1. STRATEGY & MONITORING
    const hasWorkInProgress = roadmap?.tasks.some(t => t.status === 'pending' && ((t as any).rawContent || (t as any).reviewedContent));
    
    if (isManual || !hasWorkInProgress) {
      await logAgentAction('Technical Auditor', 'active', 'Scanning website for errors...');
      await performTechnicalAudit();
      await logAgentAction('Technical Auditor', 'success', 'Audit complete.');

      await logAgentAction('Monitor Agent', 'active', 'Analyzing performance...');
      const gscData = await getPerformanceReport();
      const currentRoadmap = await getRoadmap();
      const correctionReport = currentRoadmap 
        ? await monitorPerformanceAndAdjust(gscData, currentRoadmap)
        : 'Initial strategy.';
      
      await logAgentAction('Research Agent', 'active', 'Finding opportunities...');
      const researchReport = await performDeepResearch(gscData);
      
      await logAgentAction('Strategist Agent', 'active', 'Optimizing roadmap...');
      const newTasks = await generate30DayPlan(researchReport, correctionReport);
      
      const updatedRoadmap = currentRoadmap || {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        progress: 0,
        tasks: [],
        systemStatus: 'active'
      };
      
      const completedTasks = updatedRoadmap.tasks.filter(t => t.status === 'completed');
      // Initialize pipeline for new tasks
      const initializedTasks = (newTasks as any).map((t: any) => ({
        ...t,
        pipeline: [
          { agent: 'Writer Agent', status: 'pending', message: 'Waiting for research context.' },
          { agent: 'Review Agent', status: 'pending', message: 'Waiting for content draft.' },
          { agent: 'Linking Agent', status: 'pending', message: 'Waiting for final polish.' },
          { agent: 'Publish Agent', status: 'pending', message: 'Waiting for deployment signal.' },
        ]
      }));

      updatedRoadmap.tasks = [...completedTasks, ...initializedTasks];
      await saveRoadmap(updatedRoadmap);
      await logAgentAction('Strategist Agent', 'success', 'Roadmap updated.');
      
      if (!isManual) return;
    }

    const activeRoadmap = await getRoadmap();
    if (!activeRoadmap) return;

    // 2. PIPELINE EXECUTION (One step per run)

    // A. PUBLISH
    const taskToPublish = activeRoadmap.tasks.find(t => t.status === 'pending' && (t as any).finalContent);
    if (taskToPublish) {
      await logAgentAction('Publish Agent', 'active', `Publishing: ${taskToPublish.keyword}`);
      taskToPublish.pipeline = updateStep(taskToPublish.pipeline, 'Publish Agent', 'active', 'Deploying to live environment...');
      await saveRoadmap(activeRoadmap);

      const slug = taskToPublish.keyword.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
      const res = await publishArticle(slug, taskToPublish.keyword, (taskToPublish as any).finalContent, 'Risk Management');
      
      if (res.success) {
        taskToPublish.status = 'completed';
        taskToPublish.completedAt = new Date().toISOString();
        taskToPublish.publishedUrl = res.url;
        taskToPublish.pipeline = updateStep(taskToPublish.pipeline, 'Publish Agent', 'completed', `Successfully live at ${res.url}`);
        await saveRoadmap(activeRoadmap);
        await logAgentAction('Publish Agent', 'success', `Live at ${res.url}`);
        await requestIndexing(`https://usmantrades.co.uk${res.url}`);
      } else {
        taskToPublish.pipeline = updateStep(taskToPublish.pipeline, 'Publish Agent', 'failed', 'Network error during deployment.');
        await saveRoadmap(activeRoadmap);
      }
      return;
    }

    // B. LINKING
    const taskToLink = activeRoadmap.tasks.find(t => t.status === 'pending' && (t as any).reviewedContent && !(t as any).finalContent);
    if (taskToLink) {
      await logAgentAction('Linking Agent', 'active', `Linking: ${taskToLink.keyword}`);
      taskToLink.pipeline = updateStep(taskToLink.pipeline, 'Linking Agent', 'active', 'Analyzing internal graph for contextual links...');
      await saveRoadmap(activeRoadmap);

      const linkedContent = injectContextualLinks((taskToLink as any).reviewedContent);
      (taskToLink as any).finalContent = linkedContent;
      taskToLink.pipeline = updateStep(taskToLink.pipeline, 'Linking Agent', 'completed', 'Contextual links injected successfully.');
      await saveRoadmap(activeRoadmap);
      await logAgentAction('Linking Agent', 'success', 'Links optimized.');
      return;
    }

    // C. REVIEWER
    const taskToReview = activeRoadmap.tasks.find(t => t.status === 'pending' && (t as any).rawContent && !(t as any).reviewedContent);
    if (taskToReview) {
      await logAgentAction('Review Agent', 'active', `Reviewing: ${taskToReview.keyword}`);
      taskToReview.pipeline = updateStep(taskToReview.pipeline, 'Review Agent', 'active', 'Editing content for brand voice & accuracy...');
      await saveRoadmap(activeRoadmap);

      const { approved, finalContent } = await reviewContent((taskToReview as any).rawContent);
      if (approved) {
        (taskToReview as any).reviewedContent = finalContent;
        taskToReview.pipeline = updateStep(taskToReview.pipeline, 'Review Agent', 'completed', 'Editorial review passed.');
        await saveRoadmap(activeRoadmap);
        await logAgentAction('Review Agent', 'success', 'Approved by Editor.');
      } else {
        taskToReview.pipeline = updateStep(taskToReview.pipeline, 'Review Agent', 'failed', 'Content rejected for quality standards.');
        await saveRoadmap(activeRoadmap);
      }
      return;
    }

    // D. WRITER
    const taskToDraft = activeRoadmap.tasks.find(t => t.status === 'pending' && !(t as any).rawContent);
    if (taskToDraft) {
      await logAgentAction('Writer Agent', 'active', `Drafting: ${taskToDraft.keyword}`);
      taskToDraft.pipeline = updateStep(taskToDraft.pipeline, 'Writer Agent', 'active', 'Generating technical market analysis draft...');
      await saveRoadmap(activeRoadmap);

      const content = await generateAIPost(taskToDraft.keyword);
      if (content) {
        (taskToDraft as any).rawContent = content;
        taskToDraft.pipeline = updateStep(taskToDraft.pipeline, 'Writer Agent', 'completed', 'Expert draft generated.');
        await saveRoadmap(activeRoadmap);
        await logAgentAction('Writer Agent', 'success', 'Draft complete.');
      } else {
        taskToDraft.pipeline = updateStep(taskToDraft.pipeline, 'Writer Agent', 'failed', 'OpenAI capacity error.');
        await saveRoadmap(activeRoadmap);
      }
      return;
    }

  } catch (error: any) {
    console.error('Pipeline Error:', error.message);
    await logAgentAction('Orchestrator', 'error', error.message);
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
