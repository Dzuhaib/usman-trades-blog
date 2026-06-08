import OpenAI from 'openai';
import { AuditReport } from './audit-engine';

// Create a singleton for the OpenAI client to avoid re-instantiation
let openaiClient: OpenAI | null = null;

function getOpenAIClient() {
  if (!openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OPENAI_API_KEY is not defined in environment variables.');
    }
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'missing-key',
    });
  }
  return openaiClient;
}

export interface SEOMap {
  day: number;
  keyword: string;
  intent: string;
  type: 'article' | 'tool_improvement' | 'faq' | 'glossary';
  priority: 'high' | 'medium' | 'low';
}

/**
 * Phase 1: Researcher Agent - Opportunity Evaluation
 */
export async function evaluateOpportunity(topic: string, data: any): Promise<{ beneficial: boolean; reasoning: string; priority: 'high' | 'medium' | 'low' }> {
  const openai = getOpenAIClient();
  const prompt = `
    Analyze this SEO Opportunity for "Usman Trades":
    Topic: ${topic}
    Context: ${JSON.stringify(data)}
    
    Return a JSON object: { "beneficial": boolean, "reasoning": string, "priority": "high" | "medium" | "low" }.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: "You are a ROI-focused SEO Analyst." }, { role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Opportunity Evaluation Error:', error);
    return { beneficial: false, reasoning: 'Evaluation failed', priority: 'low' };
  }
}

/**
 * Phase 1: Deep Research Agent
 */
export async function performDeepResearch(gscData: any[]): Promise<string> {
  const openai = getOpenAIClient();
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY missing.');

  const prompt = `
    You are an Expert SEO Researcher for "Usman Trades". 
    Analyze this Google Search Console data: ${JSON.stringify(gscData)}
    
    Output a detailed "SEO Audit & Opportunity Report" in Markdown format.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: "You are an elite SEO Research Agent." }, { role: "user", content: prompt }],
    });
    return response.choices[0].message.content || 'Research failed.';
  } catch (error: any) {
    console.error('Research Error:', error.message);
    throw error;
  }
}

/**
 * Phase 1.5: Monitor Agent
 */
export async function monitorPerformanceAndAdjust(gscData: any[], currentRoadmap: any): Promise<string> {
  const openai = getOpenAIClient();
  const prompt = `
    You are the "SEO Monitor Agent".
    Compare current rankings against roadmap and identify new opportunities.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: "You are an analytical SEO Monitoring Agent." }, { role: "user", content: prompt }],
    });
    return response.choices[0].message.content || 'Monitoring failed.';
  } catch (error) {
    console.error('Monitor Agent Error:', error);
    return 'No adjustments needed.';
  }
}

/**
 * Phase 2: Strategist Agent
 */
export async function generate30DayPlan(researchReport: string, correctionReport?: string): Promise<SEOMap[]> {
  const openai = getOpenAIClient();
  const prompt = `
    Generate a 30-day execution roadmap for Usman Trades.
    Return a JSON object with a "plan" key containing an array of 30 objects.
    Each object: { "day": number, "keyword": string, "type": "article" | "glossary" | "tool_improvement" | "faq", "priority": "high" | "medium" | "low", "expert_note": "..." }.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ 
        role: "system", 
        content: "You are a Senior SEO Strategist." 
      }, { 
        role: "user", 
        content: prompt 
      }],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    const rawData = JSON.parse(content || '{"plan": []}');
    return (rawData.plan || []).map((task: any) => ({
      ...task,
      status: 'pending'
    }));
  } catch (error: any) {
    console.error('Strategist Error:', error.message);
    throw error;
  }
}

/**
 * Phase 6: Glossary Agent
 */
export async function generateGlossaryEntry(term: string) {
  const openai = getOpenAIClient();
  const systemPrompt = `You are a Technical Glossary Agent for Usman Trades.`;
  const userPrompt = `Define: "${term}".`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Glossary Agent Error:', error);
    return null;
  }
}

/**
 * Phase 4: Writer Agent
 */
export async function generateAIPost(keyword: string, feedback?: string) {
  const openai = getOpenAIClient();
  const systemPrompt = `You are Muhammad Usman, an expert Market Analyst. Follow strict formatting: No dashes, 1200-1800 words, direct AEO answer in first paragraph.`;
  const userPrompt = `
    ${feedback ? `CRITICAL REVISION NEEDED: Your previous draft was rejected for these reasons: ${feedback}.` : ''}
    Write a guide for: "${keyword}".
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Writer Agent Error:', error);
    return null;
  }
}

/**
 * Audit Agent: Performs multi-layer site audits.
 */
export async function performComprehensiveAudit(gscData: any[]): Promise<AuditReport> {
  const openai = getOpenAIClient();
  const prompt = `Analyze GSC data: ${JSON.stringify(gscData.slice(0, 50))}. Generate technical, SEO, GEO, and AIO audit report. Return JSON.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: "You are an elite SEO auditor." }, { role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Audit Error:', error);
    return { technical: 'Error', seo: 'Error', geo: 'Error', aio: 'Error', timestamp: new Date().toISOString() };
  }
}

/**
 * Delegation Agent: Converts audit insights into roadmap tasks.
 */
export async function delegateAuditTasks(audit: AuditReport): Promise<SEOMap[]> {
  const openai = getOpenAIClient();
  const prompt = `
    Analyze this SEO Audit Report: ${JSON.stringify(audit)}
    Create 5 actionable tasks. Return JSON: { "tasks": [{ "day": number, "keyword": string, "type": "article" | "glossary" | "tool_improvement" | "faq", "priority": "high", "expert_note": "..." }] }.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: "You are an expert SEO task delegator." }, { role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });
    const data = JSON.parse(response.choices[0].message.content || '{"tasks": []}');
    return data.tasks || [];
  } catch (error) {
    console.error('Delegation Error:', error);
    return [];
  }
}

/**
 * Phase 5: Review Agent
 */
export async function reviewContent(content: string): Promise<{ approved: boolean; feedback: string; finalContent: string }> {
  const openai = getOpenAIClient();
  const prompt = `Review this trading article. Check Word count (1200-1800), NO DASHES, NO AI words. Return JSON.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: "You are a Senior Editorial Reviewer." }, { role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Review Agent Error:', error);
    return { approved: false, feedback: 'Review failed', finalContent: content };
  }
}
