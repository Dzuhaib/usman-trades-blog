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
 * Evaluates if a found keyword or issue is worth pursuing.
 */
export async function evaluateOpportunity(topic: string, data: any): Promise<{ beneficial: boolean; reasoning: string; priority: 'high' | 'medium' | 'low' }> {
  const openai = getOpenAIClient();
  const prompt = `
    Analyze this SEO Opportunity for "Usman Trades":
    Topic: ${topic}
    Context: ${JSON.stringify(data)}
    
    Tasks:
    1. Is this beneficial for traffic growth?
    2. Does it align with "Risk Management", "Gold", or "Forex"?
    3. What is the potential impact?
    
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
 * Analyzes GSC data to identify clusters, gaps, and high-value opportunities.
 */
export async function performDeepResearch(gscData: any[]): Promise<string> {
  const openai = getOpenAIClient();
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY missing.');

  const prompt = `
    You are an Expert SEO Researcher for "Usman Trades". 
    Analyze this raw Google Search Console data (up to 1000 rows): ${JSON.stringify(gscData)}
    
    Goal: Identify the path to 1M impressions.
    
    Tasks:
    1. Identify "Long-Tail Gold": Specific, high-intent keywords with low competition (e.g., "XAUUSD spread on news", "risk management for $500 account").
    2. Identify "Winning Clusters": Topics where we are in Pos 4-20. We need "striking distance" optimizations.
    3. Identify "AEO Gaps": Common questions in our niche that we haven't answered definitively.
    4. Propose 15 high-value "Search Intent" angles for Gold and Forex.
    
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
 * Checks Search Console performance and updates the strategist about real-time shifts.
 */
export async function monitorPerformanceAndAdjust(gscData: any[], currentRoadmap: any): Promise<string> {
  const openai = getOpenAIClient();
  const prompt = `
    You are the "SEO Monitor Agent".
    Data:
    - GSC Performance: ${JSON.stringify(gscData)}
    - Current Roadmap: ${JSON.stringify(currentRoadmap)}
    
    Tasks:
    1. Compare current rankings against the roadmap. 
    2. Are any "Completed" tasks underperforming (Pos > 20)?
    3. Are there new keywords emerging that aren't on the roadmap?
    4. Provide a "Correction Report" for the Strategist Agent.
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
 * Converts the Research Report into a Day-by-Day 30-day roadmap.
 */
export async function generate30DayPlan(researchReport: string, correctionReport?: string): Promise<SEOMap[]> {
  const openai = getOpenAIClient();
  const prompt = `
    Based on this SEO Audit Report:
    ${researchReport}
    
    ${correctionReport ? `AND this Correction Report: ${correctionReport}` : ''}
    
    Generate a 30-day "1M Impressions" execution roadmap for Usman Trades.
    
    Requirements:
    - Days 1-5: "Striking Distance" (Optimize current Pos 4-20).
    - Days 6-15: "pSEO Glossary Blitz" (Create 50+ glossary/dictionary entries for low-competition technical terms).
    - Days 16-25: "Authority Clusters" (Technical, 1500-word guides for Gold and Forex).
    - Days 26-30: "Tool-to-Content loops" (Articles that focus on using our calculators).
    
    Professional Expert Logic:
    - Every task MUST have a specific target keyword or technical goal.
    - Articles MUST target 1200-1800 words and institutional-grade depth.
    - Tasks should be designed to maximize "Answer Engine" visibility and impression share.
    
    Return a JSON object with a "plan" key containing an array of 30 objects.
    Each object: { "day": number, "keyword": string, "type": "article" | "glossary" | "tool_improvement" | "faq", "priority": "high" | "medium" | "low", "expert_note": "A short note explaining WHY this task will increase traffic" }.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ 
        role: "system", 
        content: "You are a Senior SEO Strategist obsessed with compounding organic growth and high-integrity financial content." 
      }, { 
        role: "user", 
        content: prompt 
      }],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    const rawData = JSON.parse(content || '{"plan": []}');
    const plan = rawData.plan || [];

    return plan.map((task: any) => ({
      ...task,
      status: 'pending'
    }));
  } catch (error: any) {
    console.error('Strategist Error:', error.message);
    throw error;
  }
}

/**
 * Phase 6: Glossary Agent (pSEO)
 * Generates technical dictionary/glossary entries for programmatic scaling.
 */
export async function generateGlossaryEntry(term: string) {
  const openai = getOpenAIClient();
  const systemPrompt = `
    You are the "Technical Glossary Agent" for Usman Trades. 
    Your goal is to provide a mathematically precise, institutional definition of a trading term.
    
    STRICT RULES:
    1. AEO FIRST: The first sentence must be a perfect 30-word definition.
    2. TECHNICAL DEPTH: Explain the math or mechanic behind the term.
    3. TRADER VOICE: Direct, no fluff, institutional tone.
    4. MAX 300 WORDS.
  `;

  const userPrompt = `Define the trading term: "${term}". Explain its importance in professional risk management.`;

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
 * Phase 4: Writer Agent (E-E-A-T & AEO Focused)
 */
export async function generateAIPost(keyword: string, feedback?: string) {
  const openai = getOpenAIClient();
  const systemPrompt = `
    You are Muhammad Usman, an expert Market Analyst.

    STRICT WRITING RULES (ANTI-AI & BLOG STANDARDS):
    1. LENGTH: 1200-1800 words.
    2. NO DASHES: The use of dashes (-) is BANNED.
    3. VOICE: Direct, blunt, technical. Use "I".
    4. AEO: Paragraph 1 is a direct 40-50 word answer.
    5. FORMAT: NO HTML, NO LATEX. Bold plain text for math.
    6. LINKS: 3-5 [LINK_url:label] placeholders.
    7. NO AI-ISMS: Avoid "delve", "tapestry", "embark", "furthermore", "in conclusion".
  `;

  const userPrompt = `
    ${feedback ? `CRITICAL REVISION NEEDED: Your previous draft was rejected for these reasons: ${feedback}. 
    DO NOT repeat these mistakes. Rewrite the article from scratch following the rules strictly.` : ''}
    
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

    Include:
    - 4 image markers: [IMAGE_1], [IMAGE_2], [IMAGE_3], [IMAGE_4].
    - 3-5 strategic [LINK_url:label] placeholders.
    - EMBED TOOL: If relevant, include exactly one [TOOL_slug] placeholder.
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
    console.error('OpenAI Content Generation Error:', error);
    return null;
  }
}

/**
 * Audit Agent: Performs multi-layer site audits.
 */
export async function performComprehensiveAudit(gscData: any[]): Promise<AuditReport> {
  const openai = getOpenAIClient();
  const prompt = `
    You are the "Senior Audit Agent" for Usman Trades. 
    Analyze this Google Search Console data: ${JSON.stringify(gscData.slice(0, 50))}
    
    Generate a comprehensive audit report containing:
    1. Technical Audit: Indexing issues, page speed indicators from GSC, core web vitals if visible.
    2. SEO Audit: Content relevance, meta tag quality, keyword density gaps.
    3. GEO Audit: Insights on geographic traffic distribution, localization improvements.
    4. AIO Audit: How well we answer search queries (Position Zero candidates).
    
    Return JSON: { "technical": "...", "seo": "...", "geo": "...", "aio": "..." }.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: "You are an elite SEO auditor." }, { role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Audit Error:', error);
    return { 
        technical: 'Error', 
        seo: 'Error', 
        geo: 'Error', 
        aio: 'Error', 
        timestamp: new Date().toISOString() 
    };
  }
}

/**
 * Phase 5: Review Agent (Stricter Anti-AI)
 */
export async function reviewContent(content: string): Promise<{ approved: boolean; feedback: string; finalContent: string }> {
  const openai = getOpenAIClient();
  const prompt = `
    Review this trading article for "Usman Trades". 
    Your goal is to ensure it follows the official blog standards and E-E-A-T.

    STRICT CHECKLIST:
    1. WORD COUNT: Is it between 1200-1800 words? (Reject if too short).
    2. NO DASHES: Does it contain any dashes (-)? (Reject if found).
    3. NO AI WORDS: "delve", "tapestry", "embark", "In conclusion", "Moreover", "Furthermore".
    4. AEO Summary: Does the first paragraph answer the query directly?
    5. Replace generic "Conclusion" headers with descriptive ones like "The Bottom Line on ${content.substring(0,20)}".
    
    Return a JSON object: { "approved": boolean, "feedback": string, "finalContent": string }.
  `;

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
