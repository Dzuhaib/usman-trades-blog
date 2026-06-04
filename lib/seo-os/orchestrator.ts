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
import { performTechnicalAudit } from './technical-engine';

export async function runDailyCycle(isManual: boolean = false) {
  const roadmap = getRoadmap();

  // If not manual, and system is paused, skip the cycle
  if (!isManual && roadmap?.systemStatus === 'paused') {
    console.log('[Orchestrator] System is PAUSED. Skipping cycle.');
    return;
  }

  console.log(`[Orchestrator] Professional SEO Pipeline Heartbeat (Manual: ${isManual})`);

  try {
    // 1. MONITOR & RESEARCH & STRATEGY (Only if no pending tasks have work in progress)
    // This phase is heavy, so we only run it if necessary or if manual.
    const hasWorkInProgress = roadmap?.tasks.some(t => t.status === 'pending' && ((t as any).rawContent || (t as any).reviewedContent));
    
    if (isManual || !hasWorkInProgress) {
      logAgentAction('Technical Auditor', 'active', 'Scanning website for errors...');
      await performTechnicalAudit();
      logAgentAction('Technical Auditor', 'success', 'Audit complete.');

      logAgentAction('Monitor Agent', 'active', 'Analyzing performance...');
      const gscData = await getPerformanceReport();
      const currentRoadmap = getRoadmap();
      const correctionReport = currentRoadmap 
        ? await monitorPerformanceAndAdjust(gscData, currentRoadmap)
        : 'Initial strategy.';
      
      logAgentAction('Research Agent', 'active', 'Finding opportunities...');
      const researchReport = await performDeepResearch(gscData);
      
      logAgentAction('Strategist Agent', 'active', 'Optimizing roadmap...');
      const newTasks = await generate30DayPlan(researchReport, correctionReport);
      
      const updatedRoadmap = currentRoadmap || {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        progress: 0,
        tasks: [],
        systemStatus: 'active'
      };
      
      const completedTasks = updatedRoadmap.tasks.filter(t => t.status === 'completed');
      updatedRoadmap.tasks = [...completedTasks, ...(newTasks as any)];
      saveRoadmap(updatedRoadmap);
      logAgentAction('Strategist Agent', 'success', 'Roadmap updated.');
      
      // Stop here for this run to let next runs handle the tasks (prevents timeout on Vercel)
      if (!isManual) return;
    }

    // 2. FETCH ROADMAP AGAIN (Fresh state after potential strategy update)
    const activeRoadmap = getRoadmap();
    if (!activeRoadmap) return;

    // 3. TASK EXECUTION (Pick ONLY ONE task per run to stay under Vercel's 10s limit)
    
    // A. PUBLISH (Highest priority - get content live)
    const taskToPublish = activeRoadmap.tasks.find(t => t.status === 'pending' && (t as any).finalContent);
    if (taskToPublish) {
      logAgentAction('Publish Agent', 'active', `Publishing: ${taskToPublish.keyword}`);
      const slug = taskToPublish.keyword.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
      const res = await publishArticle(slug, taskToPublish.keyword, (taskToPublish as any).finalContent, 'Risk Management');
      if (res.success) {
        taskToPublish.status = 'completed';
        taskToPublish.completedAt = new Date().toISOString();
        saveRoadmap(activeRoadmap);
        logAgentAction('Publish Agent', 'success', `Live at ${res.url}`);
        await requestIndexing(`https://usmantrades.co.uk${res.url}`);
      }
      return;
    }

    // B. LINKING (Inject internal links)
    const taskToLink = activeRoadmap.tasks.find(t => t.status === 'pending' && (t as any).reviewedContent && !(t as any).finalContent);
    if (taskToLink) {
      logAgentAction('Linking Agent', 'active', `Linking: ${taskToLink.keyword}`);
      const linkedContent = injectContextualLinks((taskToLink as any).reviewedContent);
      (taskToLink as any).finalContent = linkedContent;
      saveRoadmap(activeRoadmap);
      logAgentAction('Linking Agent', 'success', 'Links optimized.');
      return;
    }

    // C. REVIEWER (Polish content)
    const taskToReview = activeRoadmap.tasks.find(t => t.status === 'pending' && (t as any).rawContent && !(t as any).reviewedContent);
    if (taskToReview) {
      logAgentAction('Review Agent', 'active', `Reviewing: ${taskToReview.keyword}`);
      const { approved, finalContent } = await reviewContent((taskToReview as any).rawContent);
      if (approved) {
        (taskToReview as any).reviewedContent = finalContent;
        saveRoadmap(activeRoadmap);
        logAgentAction('Review Agent', 'success', 'Approved by Editor.');
      }
      return;
    }

    // D. WRITER (Draft content)
    const taskToDraft = activeRoadmap.tasks.find(t => t.status === 'pending' && !(t as any).rawContent);
    if (taskToDraft) {
      logAgentAction('Writer Agent', 'active', `Drafting: ${taskToDraft.keyword}`);
      const content = await generateAIPost(taskToDraft.keyword);
      if (content) {
        (taskToDraft as any).rawContent = content;
        saveRoadmap(activeRoadmap);
        logAgentAction('Writer Agent', 'success', 'Draft complete.');
      }
      return;
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
