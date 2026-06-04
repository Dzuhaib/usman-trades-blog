# Operational Guide: Scaling Usman Trades to 1M Impressions

This guide explains how to manage and trigger the **SEO-OS (SEO Operating System)** to maintain your growth trajectory.

## 1. How to Execute a "Glossary Blitz" or Daily Cycle

The system is designed to run automatically, but you can trigger it manually whenever you want to flood the site with new content.

### A. The Browser Method (Easiest)
Simply visit this URL in your browser:
`https://usmantrades.co.uk/api/seo-os/cron?token=seo-os-automated-trigger-2026&manual=true`

*   **What happens:** The system will immediately analyze your current rankings, find 30-50 new glossary terms or article gaps, and begin generating/publishing them.
*   **Success Message:** You should see `{"success": true, "message": "Manual cycle triggered."}`.

### B. The Terminal Method (For Developers)
Run this command in your terminal:
```bash
curl "https://usmantrades.co.uk/api/seo-os/cron?token=seo-os-automated-trigger-2026&manual=true"
```

## 2. Scaling Strategy: The 3-Month Roadmap

To hit **1M impressions**, follow this "Blitz" schedule:

| Phase | Focus | Frequency |
| :--- | :--- | :--- |
| **Month 1** | **Glossary Blitz** | Trigger manual cycle **2x per week**. Aim for 200+ technical definitions. |
| **Month 2** | **Authority Silos** | System will automatically shift to deep technical articles (1500+ words). |
| **Month 3** | **AEO Dominance** | System will focus on FAQ clusters to capture Position Zero snippets. |

## 3. Monitoring Your Growth

1.  **Check the Logs:** View `lib/seo-os/logs.json` to see what the agents are doing in real-time.
2.  **View the Roadmap:** Check `lib/seo-os/roadmap.json` to see the upcoming 30-day plan.
3.  **Google Search Console:** Watch your "Impressions" chart. You should see a "staircase" growth pattern as the pSEO pages start indexing.

## 4. Pro-Tips for Maximum Impact

*   **Don't Pause:** Ensure `systemStatus` in `roadmap.json` is always `"active"`.
*   **Quality Check:** Occasionally read a few "Dynamic Posts" on the site. If the tone needs adjustment, the AI prompts in `lib/seo-os/ai-engine.ts` can be tweaked.
*   **Tool Engagement:** Because we now embed calculators directly in articles, your "Average Session Duration" will increase—this is a massive ranking signal for Google.

---
**Status:** Initial Glossary Blitz has been triggered. The agents are now working in the background.
