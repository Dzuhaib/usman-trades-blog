import { NextResponse } from 'next/server';
import { getPerformanceReport } from '@/lib/seo-os/analytics-engine';
import { performDeepResearch, generate30DayPlan, monitorPerformanceAndAdjust } from '@/lib/seo-os/ai-engine';
import { initializeRoadmap, getRoadmap } from '@/lib/seo-os/roadmap-engine';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    console.log('[API] Stage 1: Initializing Deep Research...');
    
    // 1. Fetch real rankings from GSC
    const reports = await getPerformanceReport();
    const currentRoadmap = getRoadmap();
    
    if (!reports || reports.length === 0) {
       return NextResponse.json({ 
         success: false, 
         error: 'No Search Console data found. Site must be indexed to build a data-backed strategy.' 
       }, { status: 400 });
    }

    // 2. Monitor Agent (Correction)
    console.log('[API] Stage 1.5: Monitoring performance for roadmap corrections...');
    const correctionReport = currentRoadmap 
      ? await monitorPerformanceAndAdjust(reports, currentRoadmap)
      : 'Initial strategy generation.';

    // 3. Perform Deep Research (The "Researcher Agent")
    console.log(`[API] Analyzing ${reports.length} keywords for gaps and clusters...`);
    const researchReport = await performDeepResearch(reports);

    // 4. Build Strategy (The "Strategist Agent")
    console.log('[API] Stage 2: Drafting 30-Day Roadmap from Research & Monitor Reports...');
    const newPlan = await generate30DayPlan(researchReport, correctionReport);

    if (!newPlan || newPlan.length === 0) {
      throw new Error('Strategist failed to convert research into a plan.');
    }

    // 4. Initialize/Save
    initializeRoadmap(newPlan as any);

    console.log('[API] Autopilot Strategy Finalized.');
    return NextResponse.json({ 
      success: true, 
      count: newPlan.length,
      auditReport: researchReport 
    });

  } catch (error: any) {
    console.error('[API] Strategy Error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
