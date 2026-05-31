/**
 * SEO-OS Orchestrator
 * This script runs the full daily cycle of the SEO-OS.
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

export async function runDailyCycle() {
  console.log('[Orchestrator] Starting Daily SEO-OS Cycle...');

  try {
    // 11 PM: Monitor & Research
    logAgentAction('Monitor Agent', 'active', 'Checking GSC Performance...');
    const gscData = await getPerformanceReport();
    const currentRoadmap = getRoadmap();
    const correctionReport = currentRoadmap 
      ? await monitorPerformanceAndAdjust(gscData, currentRoadmap)
      : 'No roadmap exists yet.';
    logAgentAction('Monitor Agent', 'success', 'Performance check complete.');
    
    logAgentAction('Research Agent', 'active', 'Performing Deep Research...');
    const researchReport = await performDeepResearch(gscData);
    logAgentAction('Research Agent', 'success', 'Deep research complete.');

    // 12 AM: Strategy
    logAgentAction('Strategist Agent', 'active', 'Updating Roadmap...');
    const newTasks = await generate30DayPlan(researchReport, correctionReport);
    if (!currentRoadmap) {
      initializeRoadmap(newTasks as any);
    } else {
      currentRoadmap.tasks = newTasks as any;
      saveRoadmap(currentRoadmap);
    }
    logAgentAction('Strategist Agent', 'success', 'Roadmap updated.');

    // 1 AM: Content Planner
    const roadmap = getRoadmap();
    if (!roadmap) return;
    const todayTask = roadmap.tasks.find(t => t.status === 'pending');
    if (!todayTask) {
      console.log('No pending tasks for today.');
      return;
    }

    // 4 AM: Writer
    logAgentAction('Writer Agent', 'active', `Generating content for "${todayTask.keyword}"...`);
    const rawContent = await generateAIPost(todayTask.keyword);
    if (!rawContent) {
      logAgentAction('Writer Agent', 'error', 'Content generation failed.');
      throw new Error('Writer failed.');
    }
    logAgentAction('Writer Agent', 'success', 'Content generated.');

    // 6 AM: Review
    logAgentAction('Review Agent', 'active', 'Polishing content...');
    const { approved, finalContent, feedback } = await reviewContent(rawContent);
    if (!approved) {
      logAgentAction('Review Agent', 'error', `Content rejected: ${feedback}`);
    } else {
      logAgentAction('Review Agent', 'success', 'Content approved.');
    }

    // 8 AM: Internal Linking
    logAgentAction('Linking Agent', 'active', 'Injecting contextual links...');
    const linkedContent = injectContextualLinks(finalContent);
    logAgentAction('Linking Agent', 'success', 'Links injected.');

    // 10 AM: Publish
    logAgentAction('Publish Agent', 'active', 'Making it live...');
    const slug = todayTask.keyword.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
    const publishResult = await publishArticle(slug, todayTask.keyword, linkedContent, 'Risk Management');

    if (publishResult.success) {
      todayTask.status = 'completed';
      todayTask.publishedUrl = publishResult.url;
      todayTask.completedAt = new Date().toISOString();
      saveRoadmap(roadmap);
      logAgentAction('Publish Agent', 'success', `Published to ${publishResult.url}`);
    } else {
      logAgentAction('Publish Agent', 'error', 'Publishing failed.');
    }

    // 12 PM: Submission
    logAgentAction('Submission Agent', 'active', `Submitting ${publishResult.url} to GSC...`);
    await requestIndexing(`https://usmantrades.co.uk${publishResult.url}`);
    logAgentAction('Submission Agent', 'success', 'URL submitted for indexing.');

    // 1 PM: Analytics Reporting
    console.log('[1 PM] Generating Daily Performance Report...');
    const report = await getPerformanceReport();
    console.log('Cycle Complete.');

  } catch (error: any) {
    console.error('Cycle Error:', error.message);
    logAgentAction('Orchestrator', 'error', error.message);
  }
}

/**
 * Identify and submit any URLs that exist in the codebase but aren't in GSC yet.
 */
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
