import OpenAI from 'openai';

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
    - Days 16-25: "Authority Clusters" (Technical guides for Gold and Forex).
    - Days 26-30: "Tool-to-Content loops" (Articles that focus on using our calculators).
    
    Professional Expert Logic:
    - Every task MUST have a specific target keyword or technical goal.
    - Tasks should be designed to maximize "Answer Engine" visibility and impression share.
    
    Return a JSON object with a "plan" key containing an array of 30 objects.
    Each object: { "day": number, "keyword": string, "type": "article" | "glossary" | "tool_improvement" | "faq", "priority": "high" | "medium" | "low", "expert_note": "A short note explaining WHY this task will increase traffic" }.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ 
        role: "system", 
        content: "You are a Senior SEO Strategist obsessed with compounding organic growth." 
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
export async function generateAIPost(keyword: string) {
  const openai = getOpenAIClient();
  const systemPrompt = `
    You are Muhammad Usman, a Professional Market Analyst and Institutional Trader with 15+ years of experience. 
    Your goal is to write high-integrity, experience-backed guides that rank for both Google (E-E-A-T) and Answer Engines (AEO).

    STRICT WRITING RULES (ANTI-AI):
    1. NO AI-ISMS: Never use: "In the fast-paced world of", "delve", "tapestry", "embark", "comprehensive guide", "look no further", "moreover", "furthermore", "in conclusion", "it's important to note".
    2. VOICE: Use a direct, blunt, and technical tone. Talk like a trader in a London prop firm. Use "I" and "we" to show first-hand experience (e.g., "In my 12 years trading Gold, I've seen...").
    3. AEO SUMMARY: The VERY FIRST paragraph MUST be a 40-50 word direct answer to the keyword (target Position Zero).
    4. NO RAW HTML/LATEX: Use plain bold text for math and headers.
    5. MATH RENDERING: Use plain text with bold numbers for math. 
       Example: **Lot Size = (Risk Amount) / (Stop Loss x Pip Value)**
    6. INTERNAL LINKING: Use exactly 3-5 unique internal links using this EXACT placeholder: [LINK_url:label].
    7. TONE: Authoritative, skeptical of "retail" myths, and math-focused.
  `;

  const userPrompt = `
    Write an institutional-grade trading guide for: "${keyword}". 
    
    Structure:
    1. [AEO Summary]: Direct 45-word answer.
    2. [Experience Insight]: A brief story or observation from your trading career.
    3. [Technical Core]: Detailed mechanics with math.
    4. [Common Pitfalls]: What retail traders get wrong.
    5. [FAQ]: 3-5 high-intent questions.

    Include:
    - 4 image markers: [IMAGE_1], [IMAGE_2], [IMAGE_3], [IMAGE_4].
    - 3-5 strategic [LINK_url:label] placeholders.
    - EMBED TOOL: If the topic relates to lot size, risk, pips, or margin, include exactly one [TOOL_slug] placeholder where it makes sense.
      Available slugs: lot-size-calculator, risk-calculator, pip-calculator, margin-calculator, profit-calculator.
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
 * Phase 5: Review Agent (Stricter Anti-AI)
 */
export async function reviewContent(content: string): Promise<{ approved: boolean; feedback: string; finalContent: string }> {
  const openai = getOpenAIClient();
  const prompt = `
    Review this trading article for "Usman Trades". 
    Your ONLY goal is to ensure it DOES NOT look like AI and follows E-E-A-T.

    Tasks:
    1. REMOVE ALL AI WORDS: "delve", "tapestry", "embark", "In conclusion", "Moreover", "Furthermore", "In the world of".
    2. Check AEO Summary: Does the first paragraph answer the query directly?
    3. Check Experience: Is there a first-hand perspective ("I", "my")?
    4. Replace generic "Conclusion" headers with descriptive ones like "The Bottom Line on ${content.substring(0,20)}".
    5. Fix any LaTeX/HTML math.
    
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
