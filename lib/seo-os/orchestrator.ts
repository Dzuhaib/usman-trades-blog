/**
 * SEO-OS Orchestrator
 * This script handles the hourly execution of SEO agents.
 */

import { getPerformanceReport, requestIndexing, getMissingUrls } from './analytics-engine';
import { 
  performDeepResearch, 
  generate30DayPlan, 
  generateAIPost, 
  reviewContent,
  monitorPerformanceAndAdjust 
} from './ai-engine';
import { getRoadmap, saveRoadmap, initializeRoadmap } from './roadmap-engine';
import { injectContextualLinks } from './linking-engine';
import { publishArticle } from './publisher-engine';
import { logAgentAction } from './log-engine';

export async function runDailyCycle(isManual: boolean = false) {
  const roadmap = getRoadmap();

  // If not manual, and system is paused, skip the cycle
  if (!isManual && roadmap?.systemStatus === 'paused') {
    console.log('[Orchestrator] System is PAUSED. Skipping cycle.');
    return;
  }

  console.log(`[Orchestrator] Professional SEO Pipeline Heartbeat (Manual: ${isManual})`);

  try {
    // 1. MONITOR & RESEARCH (Pipeline Trigger)
    // Always run research to find new opportunities
    logAgentAction('Monitor Agent', 'active', 'Scanning GSC and market for new traffic opportunities...');
    const gscData = await getPerformanceReport();
    const currentRoadmap = getRoadmap();
    const correctionReport = currentRoadmap 
      ? await monitorPerformanceAndAdjust(gscData, currentRoadmap)
      : 'Initial strategy.';
    logAgentAction('Monitor Agent', 'success', 'Performance analyzed.');

    logAgentAction('Research Agent', 'active', 'Evaluating beneficial opportunities...');
    const researchReport = await performDeepResearch(gscData);
    logAgentAction('Research Agent', 'success', 'New high-ROI opportunities identified.');

    // 2. STRATEGIST (Always ensure roadmap is optimized)
    logAgentAction('Strategist Agent', 'active', 'Synchronizing roadmap with new data...');
    const newTasks = await generate30DayPlan(researchReport, correctionReport);
    const updatedRoadmap = currentRoadmap || {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      progress: 0,
      tasks: [],
      systemStatus: 'active'
    };
    
    // Only update pending tasks to avoid overwriting completed work
    const completedTasks = updatedRoadmap.tasks.filter(t => t.status === 'completed');
    updatedRoadmap.tasks = [...completedTasks, ...(newTasks as any)];
    saveRoadmap(updatedRoadmap);
    logAgentAction('Strategist Agent', 'success', 'Roadmap optimized for maximum growth.');

    // 3. WRITER (Pick up the next pending task immediately)
    const taskToDraft = updatedRoadmap.tasks.find(t => t.status === 'pending' && !(t as any).rawContent);
    if (taskToDraft) {
      logAgentAction('Writer Agent', 'active', `Drafting Expert Content: ${taskToDraft.keyword}`);
      const content = await generateAIPost(taskToDraft.keyword);
      if (content) {
        (taskToDraft as any).rawContent = content;
        saveRoadmap(updatedRoadmap);
        logAgentAction('Writer Agent', 'success', 'High-quality draft completed.');
      }
    }

    // 4. REVIEWER (Process any new drafts)
    const taskToReview = updatedRoadmap.tasks.find(t => t.status === 'pending' && (t as any).rawContent && !(t as any).reviewedContent);
    if (taskToReview) {
      logAgentAction('Review Agent', 'active', 'Polishing content for brand authority...');
      const { approved, finalContent } = await reviewContent((taskToReview as any).rawContent);
      if (approved) {
        (taskToReview as any).reviewedContent = finalContent;
        saveRoadmap(updatedRoadmap);
        logAgentAction('Review Agent', 'success', 'Content approved by Editorial.');
      }
    }

    // 5. LINKING (Optimize internal structure)
    const taskToLink = updatedRoadmap.tasks.find(t => t.status === 'pending' && (t as any).reviewedContent && !(t as any).finalContent);
    if (taskToLink) {
      logAgentAction('Linking Agent', 'active', 'Injecting contextual internal links...');
      const linkedContent = injectContextualLinks((taskToLink as any).reviewedContent);
      (taskToLink as any).finalContent = linkedContent;
      saveRoadmap(updatedRoadmap);
      logAgentAction('Linking Agent', 'success', 'Internal link architecture optimized.');
    }

    // 6. PUBLISH (Go Live)
    const taskToPublish = updatedRoadmap.tasks.find(t => t.status === 'pending' && (t as any).finalContent);
    if (taskToPublish) {
      logAgentAction('Publish Agent', 'active', 'Deploying to production...');
      const slug = taskToPublish.keyword.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
      const res = await publishArticle(slug, taskToPublish.keyword, (taskToPublish as any).finalContent, 'Risk Management');
      if (res.success) {
        taskToPublish.status = 'completed';
        taskToPublish.publishedUrl = res.url;
        taskToPublish.completedAt = new Date().toISOString();
        saveRoadmap(updatedRoadmap);
        logAgentAction('Publish Agent', 'success', `Article live at: ${res.url}`);
        
        // 7. SUBMISSION (Request Instant Indexing)
        logAgentAction('Submission Agent', 'active', 'Notifying Google of new content...');
        await requestIndexing(`https://usmantrades.co.uk${res.url}`);
        logAgentAction('Submission Agent', 'success', 'Instant indexing request sent.');
      }
    }

  } catch (error: any) {
    console.error('Pipeline Error:', error.message);
    logAgentAction('Orchestrator', 'error', error.message);
  }
}

export async function cleanupMissingUrls() {
  logAgentAction('Submission Agent', 'active', 'Scanning for missing URLs...');
  const reports = await getPerformanceReport();
  const missingUrls = await getMissingUrls(reports);
  for (const url of missingUrls) {
    await requestIndexing(`https://usmantrades.co.uk${url}`);
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  logAgentAction('Submission Agent', 'success', `Submitted ${missingUrls.length} missing URLs.`);
  return { submittedCount: missingUrls.length, urls: missingUrls };
}
