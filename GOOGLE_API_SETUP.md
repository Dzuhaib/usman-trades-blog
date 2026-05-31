# Google Service Account Setup Guide

You have your JSON file. Follow these steps to prepare the SEO-OS for live data:

## 1. File Placement
1. Rename your downloaded JSON file to `google-credentials.json`.
2. Move it to the root directory of this project (`D:\Projects\Usman Trades\my-app\`).

## 2. Security (Crucial)
Ensure that `google-credentials.json` is added to your `.gitignore` so you don't accidentally push it to GitHub.

## 3. Environment Variables
Add these to your `.env` file:
```txt
GSC_SITE_URL="https://www.usmantrades.co.uk"
GOOGLE_APPLICATION_CREDENTIALS="./google-credentials.json"
```

## 4. Search Console Connection
Once the email `usmantrades@endless-bolt-493110-u1.iam.gserviceaccount.com` is accepted by Google Search Console (as a 'Full' or 'Owner' user), the system will be able to:
- Pull your real keyword rankings.
- See which pages are indexed.
- Request indexing for new content automatically.

---
**Status:** The code in `lib/seo-os/analytics-engine.ts` is ready to be upgraded to use the `googleapis` library once these steps are done.
