# Arcade Tax Guide — Project Documentation

## Overview

Arcade Tax Guide is a React + Vite SPA that educates high earners about arcade tax strategies (IRC Section 168(k) bonus depreciation). The site includes a lead capture form that submits to GoHighLevel (GHL) CRM and fires a GA4 conversion event.

**Live:** https://arcade-tax-guide.vercel.app  
**Repo:** https://github.com/kennysabangan/arcade-tax-guide  
**Channel:** #fastfundbusiness  
**Supabase (deprecated):** Previously used; now GHL is the primary lead store.

---

## Architecture

- Frontend: React (Vite), Tailwind CSS, plain JSX (no framework)
- Deployment: Vercel (auto-deploy from GitHub)
- Backend: Vercel Serverless Functions (`/api/submit-lead`)
- CRM: GoHighLevel (GHL) Contacts API
- Analytics: Google Analytics 4 (Measurement Protocol)

---

## Lead Capture Flow

1. User fills form on either:
   - `src/pages/ArcadeLandingPage.jsx` (main landing page)
   - `src/pages/HomePage.jsx` (BookCall section)

2. Frontend POSTs to `/api/submit-lead` with payload:
   ```json
   {
     "firstName", "lastName", "email", "phone",
     "customFields": [
       { "id": "<GHL_CUSTOM_FIELD_ID>", "value": <value> },
       ...
     ]
   }
   ```
   Includes header `X-GA-Client-ID` if `_ga` cookie is present.

3. `api/submit-lead.js`:
   - Creates new GHL contact (POST `/contacts/`) or updates existing (PUT `/contacts/{id}`).
   - After successful create/update, fires GA4 `generate_lead` event (non-blocking).
   - Re-adds `arcade-tax-lead` tag after update (due to GHL API behavior).
   - CORS enabled for POST and `X-GA-Client-ID` header.

4. GHL stores contact with custom fields. These drive automation/workflows in GHL (outside this codebase).

---

## GHL Custom Field IDs (Critical)

The GHL API requires actual field IDs (22-char alphanumeric), not symbolic names. These IDs are location-specific (`Mp6SVlSkhbup63EKVSvb`).

Do **not** change frontend field names without updating the ID mapping.

| Field Name (form key) | GHL Custom Field ID | Notes |
|----------------------|---------------------|-------|
| `filing_status` | `CDic45ipvuFIuxK0ufBj` | e.g., `single`, `married` |
| `income_range` | `yr79z4yqSBLA0jHkkToD` | e.g., `200000`, `250k-500k` (string) |
| `tax_owed` | `iYCMxRDLqgbQaIYiGoK` | numeric (e.g., `40000`) |
| `275k_liquidity_available` | `DfCpDUxOkEjw8JcYt0Gz` | e.g., `25-50` (thousands) |
| `roth_conversion` | `fFI7kUtLUPxWAR3VDmSM` | `yes` / `no` |
| `urgency` | `whmzWyU6ve5cDd9ZaoMl` | number of **months** (e.g., `30`) |

**HomePage BookCall** only sends `income_range` (maps `anticipated_taxable_income` → `yr79z4yqSBLA0jHkkToD`).

---

## GA4 Integration

- **Measurement ID:** `G-G6VD432JZL` (default in code, can be overridden by `GA_MEASUREMENT_ID` env var)
- **API Secret:** `GA_API_SECRET` (set in Vercel environment variables)
- **Client ID:** Extracted from `_ga` cookie (`GA1.x.y` → `x.y`) and sent via `X-GA-Client-ID` header.
- **Event:** `generate_lead` with params `{ event_category: 'lead', event_label: 'arcade_landing_page', value: 1 }`
- Fired **server-side** after successful GHL create/update; does not block response.

---

## Environment Variables (Vercel)

- `GA_API_SECRET` — required for Measurement Protocol
- (Optional) `GA_MEASUREMENT_ID` — overrides default `G-G6VD432JZL`
- No GHL API keys in client; GHL Bearer token is hardcoded in `api/submit-lead.js` (consider moving to env).

---

## Form Fields

**ArcadeLandingPage form fields:**
- `firstName`, `lastName`, `email`, `mobile`
- `filingStatus`, `income`, `taxOwed`, `liquidity`, `rothConversion`, `timeline`

**HomePage BookCall form field:**
- `anticipated_taxable_income` → sends only `income_range`

---

## Recent Changes & Known Issues

- [x] 2x2 grid on Problem section (mobile & desktop) with centered content
- [x] GA4 server-side + `_ga` cookie extraction
- [x] Custom field IDs corrected (commit `b8486cf` — based on test submission from `ksabangan121@gmail.com`)
- [x] CORS header `X-GA-Client-ID` allowed

**Note:** Urgency is interpreted as **months**, not years. Form label should clarify to avoid confusion.

---

## Testing

- Submit form with `ksabangan121@gmail.com` to verify GHL custom field mapping.
- Check GHL contact record: fields should appear as:
  - `filing_status`: `single`
  - `income_range`: `200000`
  - `tax_owed`: `40000`
  - `275k_liquidity_available`: `25-50`
  - `roth_conversion`: `no`
  - `urgency`: `30`
- GA4 event appears in DebugView or network tab to `www.google-analytics.com/mp/collect`.

---

## Debugging Tips

- **GHL API key**: Found in `api/submit-lead.js` as `GHL_HEADERS.Authorization`. Treat as secret.
- **Location ID**: `Mp6SVlSkhbup63EKVSvb`
- **Contact search**: `GET https://services.leadconnectorhq.com/contacts/?locationId=Mp6SVlSkhbup63EKVSvb&query=<email>`
- **Custom fields discovery**: Not available via API; must obtain IDs from GHL UI (Settings > Custom Fields) or from an existing contact's `customFields` array.

---

## Workflow Outside Codebase

GHL is configured with tags, pipelines, and automations:
- Tag: `arcade-tax-lead` added on every submission.
- Custom fields drive follow-up sequences (managed in GHL UI).

---

## Deployment Workflow

- All changes must be committed and pushed to the `main` branch to trigger Vercel deployment.
- **Automatic:** After any coding change, push happens automatically without asking.
- Verify deployment by visiting `https://arcade-tax-guide.vercel.app` and checking Vercel dashboard for build status.

See also: [Session Startup Checklist](#session-startup-checklist-for-new-sessions).

---

## Coding Standards (for future sessions)

- All changes to GHL field mappings must update both frontend (JSX) and back side (API) if the schema evolves.
- Use Claude Code subagents for all coding work (AGENTS.md rule).
- Always run a test submission after modifying lead form or custom field IDs.
- Keep commits focused and descriptive; push promptly.

---

## Session Startup Checklist (for new sessions)

1. Read this `PROJECT.md`.
2. Read `MEMORY.md` for long-term context.
3. Check the latest `memory/YYYY-MM-DD.md` (if exists) for recent activity.
4. Verify current Git status and remote state (`git log --oneline`, `git status`).
5. Confirm Vercel environment includes `GA_API_SECRET`.

---

## Contact

- Project channel: #fastfundbusiness
- Owner: Kenny (TraderKenny)
