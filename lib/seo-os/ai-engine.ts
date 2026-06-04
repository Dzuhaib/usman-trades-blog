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
  type: 'article' | 'tool_improvement' | 'faq';
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
    Analyze this raw Google Search Console data: ${JSON.stringify(gscData)}
    
    Tasks:
    1. Identify "Winning Clusters": Topics where we are in Pos 4-15 with high impressions (low-hanging fruit).
    2. Identify "Content Gaps": Keywords where CTR is low despite good positions.
    3. Identify "Topical Authority Needs": Where do we lack coverage in the "Risk Management" niche?
    4. Propose 10 high-value "Search Intent" angles for Gold and Forex.
    
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
    
    Generate a 30-day execution roadmap for Usman Trades.
    
    Requirements:
    - Days 1-10: "Aggressive Growth" (Targeting Pos 11-20 keywords to push them to Page 1).
    - Days 11-20: "Authority Expansion" (Creating high-depth technical articles for Gold and Forex).
    - Days 21-30: "Moat Building" (Internal linking clusters and FAQ dominance).
    
    Professional Expert Logic:
    - Every task MUST have a specific target keyword or technical goal.
    - Tasks should be designed to increase organic traffic by at least 20%.
    
    Return a JSON object with a "plan" key containing an array of 30 objects.
    Each object: { "day": number, "keyword": string, "type": "article" | "tool_improvement" | "faq", "priority": "high" | "medium" | "low", "expert_note": "A short note explaining WHY this task will increase traffic" }.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ 
        role: "system", 
        content: "You are a Senior SEO Strategist that builds data-backed roadmaps." 
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
 * Phase 4: Writer Agent
 * Generates a full humanoid blog post based on a target keyword.
 */
export async function generateAIPost(keyword: string) {
  const openai = getOpenAIClient();
  const systemPrompt = `
    You are a Senior Market Analyst and Expert Trader with 15+ years of experience. 
    Your goal is to write high-quality, original, and deeply informative articles that comply with Google AdSense and E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) standards.

    STRICT CONTENT GUIDELINES (AdSense Compliance):
    1. ORIGINALITY: Never provide generic or auto-generated-sounding text. Add unique insights that only an expert trader would know.
    2. DEPTH & LENGTH: Avoid "insufficient content" flags. Write a comprehensive guide (1000-1500 words) using complete sentences and well-structured paragraphs.
    3. STRUCTURE: Use clear, hierarchical headings (H1, H2, H3). Every heading MUST be followed by multiple paragraphs of rich, meaningful text. No headlines without substance.
    4. NO AUTO-GENERATED TRAITS: Avoid repetitive filler, "fluff" words, or templates. Every sentence must add new value.
    5. USER VALUE: Provide a clear "reason to visit." Solve specific trading problems. Don't just summarize; teach.
    6. TONE: Maintain a professional, humanoid tone. Avoid common AI tropes like "In conclusion," "Embark on a journey," or "Delve into."
    7. FACTUAL ACCURACY: Use real examples of pips, lot sizes, and risk math.
  `;

  const userPrompt = `
    Write a comprehensive, expert-level trading guide for the keyword: "${keyword}". 
    Focus on the "Usman Trades" voice: Risk-first, math-heavy, capital preservation.

    Format: MDX (no frontmatter).
    Include:
    - 4 image placeholder markers like [IMAGE_PROMPT: description].
    - A detailed FAQ section at the end.
    - Specific mathematical examples (Lot sizes, Drawdown math).
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
 * Phase 5: Review Agent
 * Reviews generated content for quality and brand alignment.
 */
export async function reviewContent(content: string): Promise<{ approved: boolean; feedback: string; finalContent: string }> {
  const openai = getOpenAIClient();
  const prompt = `
    Review this trading article for "Usman Trades":
    ${content}
    
    Tasks:
    1. Check for AI fluff (words like "delve", "tapestry", "embark"). Remove them.
    2. Ensure mathematical accuracy in any pip/lot size examples.
    3. Ensure the tone is "Capital Preservation First".
    
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
