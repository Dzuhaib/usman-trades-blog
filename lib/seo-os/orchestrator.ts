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
  const now = new Date();
  // We use UTC hours to be consistent across deployments
  const hour = now.getUTCHours();
  
  console.log(`[Orchestrator] Heartbeat at ${hour}:00 UTC (Manual: ${isManual})`);

  try {
    // 11 PM UTC (23): Monitor & Research & Strategy
    if (hour === 23 || isManual) {
      logAgentAction('Monitor Agent', 'active', 'Analyzing GSC performance...');
      const gscData = await getPerformanceReport();
      const currentRoadmap = getRoadmap();
      const correctionReport = currentRoadmap 
        ? await monitorPerformanceAndAdjust(gscData, currentRoadmap)
        : 'Initial strategy.';
      logAgentAction('Monitor Agent', 'success', 'Performance analyzed.');

      logAgentAction('Research Agent', 'active', 'Identifying keyword gaps...');
      const researchReport = await performDeepResearch(gscData);
      logAgentAction('Research Agent', 'success', 'Gaps identified.');

      logAgentAction('Strategist Agent', 'active', 'Updating 30-day roadmap...');
      const newTasks = await generate30DayPlan(researchReport, correctionReport);
      if (!currentRoadmap) initializeRoadmap(newTasks as any);
      else {
        currentRoadmap.tasks = newTasks as any;
        saveRoadmap(currentRoadmap);
      }
      logAgentAction('Strategist Agent', 'success', 'Roadmap synchronized.');
      
      // If we were just testing manual mode, we can stop here or continue
      if (isManual && hour !== 23) return; 
    }

    // 4 AM UTC (4): Writer Agent
    if (hour === 4) {
      const roadmap = getRoadmap();
      const task = roadmap?.tasks.find(t => t.status === 'pending');
      if (task) {
        logAgentAction('Writer Agent', 'active', `Drafting article: ${task.keyword}`);
        const content = await generateAIPost(task.keyword);
        if (content) {
          // Store raw content in task for Review Agent
          (task as any).rawContent = content;
          saveRoadmap(roadmap!);
          logAgentAction('Writer Agent', 'success', 'Draft complete.');
        } else {
          logAgentAction('Writer Agent', 'error', 'Drafting failed.');
        }
      }
    }

    // 6 AM UTC (6): Review Agent
    if (hour === 6) {
      const roadmap = getRoadmap();
      const task = roadmap?.tasks.find(t => t.status === 'pending' && (t as any).rawContent);
      if (task) {
        logAgentAction('Review Agent', 'active', 'Polishing content for brand voice...');
        const { approved, finalContent } = await reviewContent((task as any).rawContent);
        if (approved) {
          (task as any).reviewedContent = finalContent;
          saveRoadmap(roadmap!);
          logAgentAction('Review Agent', 'success', 'Content approved.');
        } else {
          logAgentAction('Review Agent', 'error', 'Content rejected.');
        }
      }
    }

    // 8 AM UTC (8): Linking Agent
    if (hour === 8) {
      const roadmap = getRoadmap();
      const task = roadmap?.tasks.find(t => t.status === 'pending' && (t as any).reviewedContent);
      if (task) {
        logAgentAction('Linking Agent', 'active', 'Injecting internal links...');
        const linkedContent = injectContextualLinks((task as any).reviewedContent);
        (task as any).finalContent = linkedContent;
        saveRoadmap(roadmap!);
        logAgentAction('Linking Agent', 'success', 'Internal links optimized.');
      }
    }

    // 10 AM UTC (10): Publish Agent
    if (hour === 10) {
      const roadmap = getRoadmap();
      const task = roadmap?.tasks.find(t => t.status === 'pending' && (t as any).finalContent);
      if (task) {
        logAgentAction('Publish Agent', 'active', 'Publishing to live site...');
        const slug = task.keyword.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
        const res = await publishArticle(slug, task.keyword, (task as any).finalContent, 'Risk Management');
        if (res.success) {
          task.status = 'completed';
          task.publishedUrl = res.url;
          task.completedAt = new Date().toISOString();
          saveRoadmap(roadmap!);
          logAgentAction('Publish Agent', 'success', `Live at ${res.url}`);
        } else {
          logAgentAction('Publish Agent', 'error', 'Publication failed.');
        }
      }
    }

    // 12 PM UTC (12): Submission Agent
    if (hour === 12) {
      const roadmap = getRoadmap();
      const task = roadmap?.tasks.find(t => t.status === 'completed' && !t.completedAt?.startsWith(new Date().toISOString().split('T')[0]));
      // Note: we actually want the one completed today
      const today = new Date().toISOString().split('T')[0];
      const todayTask = roadmap?.tasks.find(t => t.status === 'completed' && t.completedAt?.startsWith(today));
      
      if (todayTask) {
        logAgentAction('Submission Agent', 'active', 'Requesting Google crawl...');
        await requestIndexing(`https://usmantrades.co.uk${todayTask.publishedUrl}`);
        logAgentAction('Submission Agent', 'success', 'Indexing request sent.');
      }
    }

    // Catch-all for other hours
    if (![23, 4, 6, 8, 10, 12].includes(hour)) {
      console.log(`[Orchestrator] Idle hour. Agents awaiting their schedule.`);
    }

  } catch (error: any) {
    console.error('Cycle Error:', error.message);
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
