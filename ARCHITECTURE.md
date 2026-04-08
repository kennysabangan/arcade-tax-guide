# Arcade Tax Guide — Business Architecture

## Overview
Arcade Tax Guide is a React + Vite SPA that educates and captures leads for a specialized tax strategy: using arcade games as qualifying assets for **100% bonus depreciation** under IRC § 168(k), as restored by the **One Big Beautiful Bill Act (OBBBA) of 2025**.

## Business Model
1. **Lead Capture:** Website visitors request a "Free Strategy Blueprint" by submitting contact info.
2. **Lead Routing:** Submissions go directly to GoHighLevel (GHL) CRM for follow-up by sales team.
3. **Value Delivery:** Free 30-minute consultation showing personalized tax savings.
4. **Conversion:** Client purchases arcade game asset ($25k down, $200k+ deduction potential).

## Funnel Pages

### `/` (HomePage)
- Hero: "Qualifying Arcade Games for Bonus Depreciation"
- Overview of the tax strategy
- Gallery of commercial arcade deployments
- FAQ section
- Glossary of tax terms
- CPA email template generator
- Lead capture form (Book a Call)

### `/arcade` (ArcadeLandingPage)
- Lead-gen focused page for paid traffic
- Similar content to home but optimized for conversion
- Direct link to booking calendar (Calendly)

### `/tax-guide`
- Deep-dive educational content
- Bonus depreciation mechanics
- MACRS property classification
- IRC references and citations

### `/calculator`
- Interactive tax savings calculator
- Input: income, asset cost, tax bracket
- Output: deduction amount, tax savings, cash flow impact

### `/financials`
- Detailed financial examples
- W-2 earner scenarios
- Business owner scenarios
- Before/after tax comparisons

### `/retirement`
- Long-term wealth building strategy
- Using arcade games in retirement planning
- Passive income vs. active business use

## Lead Scoring Logic
Form submissions compute a lead score (0-3):
- Income > $200K: +1
- Liquidity available: +1
- Urgency within 30 days: +1

Higher score = faster sales follow-up.

## Tech Stack
- **Frontend:** React + Vite + Tailwind CSS
- **Routing:** React Router v6
- **Analytics:** Vercel Analytics + Google Analytics 4
- **CRM:** GoHighLevel API
- **Hosting:** Vercel

## API Endpoints

### `POST /api/submit-lead`
Creates or updates a contact in GoHighLevel.
- **Auth:** Bearer token (pit-*)
- **Location ID:** `Mp6SVlSkhbup63EKVSvb`
- **Custom Fields Mapping:**
  - `filing_status`: `2SUP1cLPoUkecnIj0fNh`
  - `income_range`: `xtYbdtKV2GB7KFBMZIJj`
  - `tax_owed`: `iYCMxRDLqgbQaIYiGoCk`
  - `liquidity`: `8DLGn4gzV3BLqRWbt0DP`
  - `urgency`: `eBxzRtzSfo3UjBknVHkT`
  - `lead_score`: `1NdH5nTE1us9KEkfJFMi`

## Referral Tracking

The website supports referral tracking via URL parameter `ref` on both `/` (HomePage) and `/arcade` (ArcadeLandingPage) pages.

### URL Parameter
- Example: `?ref=svconsulting` or `?ref=1000banks`
- When present, the form's `source` field is set to the referral value.
- The referral value is stored in `sessionStorage` so it persists across page navigation before submission.

### GHL Tags
Based on the `ref` value, corresponding tags are added to the GoHighLevel contact:
- `svconsulting` → tags: `partner-svconsulting`
- `1000banks` → tags: `partner-1000banks`
- No ref → tags: `arcade-tax-lead` (current default)

### Implementation
- Frontend: `useSearchParams` to read `ref` from URL, store in sessionStorage, include in API request.
- Backend: `/api/submit-lead` reads `ref` parameter and assigns appropriate tags before creating/updating GHL contact.
- Duplicate contact handling also uses the same tag logic.

## Deployment
- **URL:** https://arcade-tax-guide-pujuijzaw-scalesolving.vercel.app
- **Repo:** https://github.com/kennysabangan/arcade-tax-guide
- **Auto-deploy:** On push to `main` branch via Vercel GitHub integration

## Analytics & Tracking
- **GA4 Measurement ID:** G-G6VD432JZL
- **Meta Pixel ID:** 953181697145468
- **Event Tracking:** `generate_lead` event on form submission
- **Page Tracking:** Automatic via React Router + Vercel Analytics
- **Meta Pixel Events:** PageView (baseline), Lead (form submit), ViewContent (page views)
- **Google Sheet Logging:** All leads appended to Google Sheet via Sheets API (requires GOOGLE_SHEET_ID and GOOGLE_API_KEY env vars)

## Security Notes
- **GHL API Token:** Stored in Vercel environment variables (never commit)
- **CORS:** Configured to allow cross-origin requests from any domain
- **Rate Limiting:** Handled by Vercel's edge network

## Team & Workflow
- **Sales Team:** Receives leads in GHL, follows up within 24 hours
- **Content Updates:** Managed via GitHub commits
- **Design System:** Custom Tailwind config with gold/dark theme
