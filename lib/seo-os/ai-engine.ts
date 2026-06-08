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
 * Phase 4: Writer Agent (E-E-A-T & AEO Focused - ONE SHOT)
 */
export async function generateAIPost(keyword: string) {
  const openai = getOpenAIClient();
  const systemPrompt = `
    You are Muhammad Usman, an expert Market Analyst. 
    YOUR OUTPUT MUST COMPLY WITH ALL RULES IN ONE ATTEMPT. DO NOT REQUIRE REVISION.

    STRICT WRITING RULES (ANTI-AI & BLOG STANDARDS):
    1. LENGTH: 1200-1800 words.
    2. NO DASHES: The use of dashes (-) is BANNED.
    3. VOICE: Direct, blunt, technical. Use "I".
    4. AEO: Paragraph 1 is a direct 40-50 word answer.
    5. FORMAT: NO HTML, NO LATEX. Bold plain text for math.
    6. LINKS: 3-5 [LINK_url:label] placeholders.
    7. NO AI-ISMS: Avoid "delve", "tapestry", "embark", "furthermore", "in conclusion".
    
    PRE-DRAFT CHECKLIST:
    - Are there any dashes? If yes, REWRITE.
    - Is word count > 1200? If no, EXPAND.
    - Is paragraph 1 a direct answer? If no, REWRITE.
  `;

  const userPrompt = `
    Write an institutional-grade guide for: "${keyword}". 
    
    Structure (FOLLOW EXACTLY):
    1. [AEO Summary]: Direct 45-word answer.
    2. Introduction: Introduce the topic.
    3. Main Concept: Technical explanation.
    4. Practical Example: Realistic trading math scenario.
    5. Common Mistakes: Institutional perspective.
    6. Risk Considerations.
    7. FAQ: 3-5 high-intent questions.
    8. Related Tools & Articles.
    9. Conclusion: Summary and takeaways.

    Include 4 image markers: [IMAGE_1], [IMAGE_2], [IMAGE_3], [IMAGE_4].
    Include 3-5 strategic [LINK_url:label] placeholders.
    Include 1 [TOOL_slug] placeholder.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
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
  const prompt = `
    Analyze this GSC data: ${JSON.stringify(gscData.slice(0, 50))}. 
    
    Generate an audit report with page-by-page breakdowns.
    
    Return JSON structured exactly as: 
    { 
        "pages": [
            { 
                "url": string, 
                "issues": [{ "type": "technical" | "seo" | "geo" | "aio", "description": string, "severity": "high" | "medium" | "low" }] 
            }
        ] 
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: "You are an elite SEO auditor. You MUST return valid JSON." }, { role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });
    return JSON.parse(response.choices[0].message.content || '{"pages": []}');
  } catch (error) {
    console.error('Audit Error:', error);
    return { pages: [], timestamp: new Date().toISOString() };
  }
}

/**
 * Delegation Agent: Converts audit insights into roadmap tasks.
 */
export async function delegateAuditTasks(audit: AuditReport): Promise<SEOMap[]> {
  const openai = getOpenAIClient();
  const prompt = `
    Analyze this SEO Audit Report: ${JSON.stringify(audit)}
    For every issue found, create an actionable roadmap task to resolve it.
    
    Return a JSON object with a "tasks" key containing an array of task objects.
    Each object: { "day": number, "keyword": string, "type": "article" | "glossary" | "tool_improvement" | "faq", "priority": "high", "expert_note": "..." }.
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
