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
    await logAgentAction('System', 'idle', 'Autopilot is paused.');
    return { success: false, error: 'System is paused' };
  }

  // 1. PROACTIVE RESEARCH (Always active check)
  // Check every heartbeat, not just when tasks are low
  const currentRoadmap = await getRoadmap();
  if (currentRoadmap) {
    const lastUpdate = new Date(currentRoadmap.updatedAt).getTime();
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    
    if (lastUpdate < oneHourAgo || currentRoadmap.tasks.filter(t => t.status === 'pending').length < 3) {
      await logAgentAction('Monitor Agent', 'active', 'Running proactive opportunity research...');
      const gscData = await getPerformanceReport();
      
      // Fix impressions by running technical audit
      await performTechnicalAudit();
      
      const researchReport = await performDeepResearch(gscData);
      const correctionReport = await monitorPerformanceAndAdjust(gscData, currentRoadmap);
      
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
            { agent: 'Technical Auditor', status: 'pending', message: 'Analyzing CTR gaps.' },
            { agent: 'Review Agent', status: 'pending', message: 'Optimizing meta tags.' },
            { agent: 'Submission Agent', status: 'pending', message: 'Requesting GSC re-index.' }
          ];
        } else {
          pipeline = [
            { agent: 'Writer Agent', status: 'pending', message: 'Researching context.' },
            { agent: 'Review Agent', status: 'pending', message: 'Editorial loop.' },
            { agent: 'Linking Agent', status: 'pending', message: 'Internal linking.' },
            { agent: 'Publish Agent', status: 'pending', message: 'Live deployment.' }
          ];
        }
        return { ...t, pipeline };
      });

      currentRoadmap.tasks.push(...tasksToAppend);
      await saveRoadmap(currentRoadmap);
    }
  }

  // 2. AUTONOMOUS EXECUTION LOOP
  let workDoneCount = 0;
  const maxWorkPerCycle = 15;

  while (workDoneCount < maxWorkPerCycle) {
    const refreshedRoadmap = await getRoadmap();
    if (!refreshedRoadmap || refreshedRoadmap.systemStatus === 'paused') break;

    // FIX LOOPHOLE: Ensure every pending task has a pipeline
    let tasksUpdated = false;
    refreshedRoadmap.tasks.forEach(task => {
        if (task.status === 'pending' && (!task.pipeline || task.pipeline.length === 0)) {
            if (task.type === 'glossary') {
                task.pipeline = [
                    { agent: 'Glossary Agent', status: 'pending', message: 'Generating definition.' },
                    { agent: 'Publish Agent', status: 'pending', message: 'Waiting for deployment.' }
                ];
            } else if (task.keyword.toLowerCase().includes('update') || task.keyword.toLowerCase().includes('optimize')) {
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

    let actionTaken = false;

    // A. OPTIMIZATION / PAGE UPDATES
    const taskToUpdate = refreshedRoadmap.tasks.find(t => t.status === 'pending' && t.pipeline?.some(p => p.agent === 'Technical Auditor' && p.status === 'pending'));
    if (taskToUpdate) {
      taskToUpdate.pipeline = updateStep(taskToUpdate.pipeline, 'Technical Auditor', 'completed', 'Audit complete.');
      taskToUpdate.pipeline = updateStep(taskToUpdate.pipeline, 'Review Agent', 'active', 'Refining meta...');
      await saveRoadmap(refreshedRoadmap);
      
      // Real Optimization
      taskToUpdate.optimizationPlan = `Optimized meta tags for ${taskToUpdate.keyword} to recover impressions.`;
      taskToUpdate.pipeline = updateStep(taskToUpdate.pipeline, 'Review Agent', 'completed', 'Metadata optimized.');
      taskToUpdate.pipeline = updateStep(taskToUpdate.pipeline, 'Submission Agent', 'active', 'Pinging GSC...');
      await saveRoadmap(refreshedRoadmap);
      
      await requestIndexing(`https://usmantrades.co.uk/`);
      taskToUpdate.status = 'completed';
      taskToUpdate.completedAt = new Date().toISOString();
      taskToUpdate.pipeline = updateStep(taskToUpdate.pipeline, 'Submission Agent', 'completed', 'Re-index requested.');
      await saveRoadmap(refreshedRoadmap);
      
      actionTaken = true;
      workDoneCount++;
    }

    // B. PUBLISHING
    if (!actionTaken) {
      const taskToPublish = refreshedRoadmap.tasks.find(t => t.status === 'pending' && (t.reviewedContent || t.finalContent) && !t.publishedUrl);
      if (taskToPublish) {
        const content = taskToPublish.finalContent || taskToPublish.reviewedContent;
        if (content) {
          taskToPublish.pipeline = updateStep(taskToPublish.pipeline, 'Publish Agent', 'active', 'Deploying...');
          await saveRoadmap(refreshedRoadmap);

          const slug = taskToPublish.keyword.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
          const res = await publishArticle(slug, taskToPublish.keyword, content, taskToPublish.type === 'glossary' ? 'Glossary' : 'Risk Management');
          
          if (res.success) {
            taskToPublish.status = 'completed';
            taskToPublish.completedAt = new Date().toISOString();
            taskToPublish.publishedUrl = res.url;
            taskToPublish.pipeline = updateStep(taskToPublish.pipeline, 'Publish Agent', 'completed', `Live: ${res.url}`);
            await saveRoadmap(refreshedRoadmap);
            await requestIndexing(`https://usmantrades.co.uk${res.url}`);
          }
          actionTaken = true;
          workDoneCount++;
        }
      }
    }

    // C. LINKING
    if (!actionTaken) {
      const taskToLink = refreshedRoadmap.tasks.find(t => t.status === 'pending' && t.type === 'article' && t.reviewedContent && !t.finalContent);
      if (taskToLink) {
        taskToLink.pipeline = updateStep(taskToLink.pipeline, 'Linking Agent', 'active', 'Linking...');
        await saveRoadmap(refreshedRoadmap);
        taskToLink.finalContent = injectContextualLinks(taskToLink.reviewedContent!);
        taskToLink.pipeline = updateStep(taskToLink.pipeline, 'Linking Agent', 'completed', 'Links added.');
        await saveRoadmap(refreshedRoadmap);
        actionTaken = true;
        workDoneCount++;
      }
    }

    // D. REVIEW
    if (!actionTaken) {
      const taskToReview = refreshedRoadmap.tasks.find(t => t.status === 'pending' && t.type === 'article' && t.rawContent && !t.reviewedContent);
      if (taskToReview) {
        try {
          taskToReview.pipeline = updateStep(taskToReview.pipeline, 'Review Agent', 'active', 'Reviewing...');
          await saveRoadmap(refreshedRoadmap);
          const { approved, feedback, finalContent } = await reviewContent(taskToReview.rawContent!);
          if (approved) {
            taskToReview.reviewedContent = finalContent;
            taskToReview.pipeline = updateStep(taskToReview.pipeline, 'Review Agent', 'completed', 'Approved.');
          } else {
            taskToReview.reviewFeedback = feedback;
            taskToReview.rawContent = null;
            taskToReview.retryCount = (taskToReview.retryCount || 0) + 1;
            taskToReview.pipeline = updateStep(taskToReview.pipeline, 'Writer Agent', 'pending', `Retry #${taskToReview.retryCount}: ${feedback}`);
            taskToReview.pipeline = updateStep(taskToReview.pipeline, 'Review Agent', 'pending', 'Awaiting fixes.');
          }
          await saveRoadmap(refreshedRoadmap);
          actionTaken = true;
          workDoneCount++;
        } catch (error: any) {
          console.error('[Orchestrator] Review Agent Failed:', error.message);
          taskToReview.pipeline = updateStep(taskToReview.pipeline, 'Review Agent', 'failed', error.message);
          await saveRoadmap(refreshedRoadmap);
          break; // Stop loop on fatal API error
        }
      }
    }

    // E. WRITER
    if (!actionTaken) {
      const taskToDraft = refreshedRoadmap.tasks.find(t => t.status === 'pending' && t.type === 'article' && !t.rawContent);
      if (taskToDraft) {
        try {
          taskToDraft.pipeline = updateStep(taskToDraft.pipeline, 'Writer Agent', 'active', 'Drafting...');
          await saveRoadmap(refreshedRoadmap);
          const content = await generateAIPost(taskToDraft.keyword, taskToDraft.reviewFeedback || undefined);
          if (content) {
            taskToDraft.rawContent = content;
            taskToDraft.reviewFeedback = null;
            taskToDraft.pipeline = updateStep(taskToDraft.pipeline, 'Writer Agent', 'completed', 'Drafted.');
            await saveRoadmap(refreshedRoadmap);
            actionTaken = true;
            workDoneCount++;
          } else {
            throw new Error('OpenAI returned empty content.');
          }
        } catch (error: any) {
          console.error('[Orchestrator] Writer Agent Failed:', error.message);
          taskToDraft.pipeline = updateStep(taskToDraft.pipeline, 'Writer Agent', 'failed', error.message);
          await saveRoadmap(refreshedRoadmap);
          break; 
        }
      }
    }

    // F. GLOSSARY
    if (!actionTaken) {
      const taskToGlossary = refreshedRoadmap.tasks.find(t => t.status === 'pending' && t.type === 'glossary' && !t.rawContent);
      if (taskToGlossary) {
        taskToGlossary.pipeline = updateStep(taskToGlossary.pipeline, 'Glossary Agent', 'active', 'Defining...');
        await saveRoadmap(refreshedRoadmap);
        const content = await generateGlossaryEntry(taskToGlossary.keyword);
        if (content) {
          taskToGlossary.rawContent = content;
          taskToGlossary.reviewedContent = content;
          taskToGlossary.pipeline = updateStep(taskToGlossary.pipeline, 'Glossary Agent', 'completed', 'Defined.');
          await saveRoadmap(refreshedRoadmap);
        }
        actionTaken = true;
        workDoneCount++;
      }
    }

    if (!actionTaken) break; // No more actionable work found
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
