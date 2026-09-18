# AfterBuy — Complete Zero-Cost Product and Design Blueprint

**Everything that happens after you buy something.**

Prepared for Abdulrahman Itseghosime Bello • 17 September 2026 • Version 3.0 (Zero-Cost + Master Design Audit)

**Status:** A definitive implementation specification[cite: 2]. This document marries the comprehensive 102-screen UX master brief with a strictly zero-cost serverless architecture (Next.js, Supabase, Cloudinary, Gemini Free Tier)[cite: 2, 3].

## Contents

1. [Product Purpose and Zero-Cost Architecture](#1-product-purpose-and-zero-cost-architecture)
2. [Mandatory UI, Theme, and Responsive Rules](#2-mandatory-ui-theme-and-responsive-rules)
3. [Complete Screen and State Inventory (102 States)](#3-complete-screen-and-state-inventory-102-states)
4. [Onboarding and 11-Module Learning Center](#4-onboarding-and-11-module-learning-center)
5. [Intake, Redaction, and AI Extraction Workflow](#5-intake-redaction-and-ai-extraction-workflow)
6. [Data Model, RLS, and Business Logic](#6-data-model-rls-and-business-logic)
7. [Enrichment, Recalls, and Government APIs](#7-enrichment-recalls-and-government-apis)
8. [Queue Polling, Keep-Alive, and Infrastructure Limits](#8-queue-polling-keep-alive-and-infrastructure-limits)

---

## 1. Product Purpose and Zero-Cost Architecture

AfterBuy helps adults keep purchases and receipts, organize owned products, track confirmed returns/warranties, review potential safety matches, and understand spending[cite: 3].

To operate permanently without cloud billing, the infrastructure is defined as:

- **Frontend & API:** Next.js App Router on Vercel Hobby Tier[cite: 2].
- **Database & Auth:** Supabase Free Tier (PostgreSQL with Row Level Security)[cite: 2].
- **Storage:** Cloudinary Free Tier (Direct client-side signed uploads)[cite: 2].
- **AI & Enrichment:** Gemini 1.5 Flash Free Tier, Open Food Facts, CPSC, and openFDA[cite: 2].
- **Keep-Alive Engine:** GitHub Actions cron job triggering a Supabase ping every 3 days to prevent automated project pausing.

---

## 2. Mandatory UI, Theme, and Responsive Rules

The UI must project a modern, calm, premium consumer-product identity using Tailwind CSS[cite: 3].

### 2.1 Dark Mode is Required

- Deliver fully designed **Light and Dark modes** across all public pages, authentication flows, dialogs, charts, and document previews[cite: 3].
- Use semantic Tailwind tokens (e.g., `bg-surface`, `text-primary`). Do not simply invert colors or put gray text on pure black[cite: 3].
- Preserve real receipt imagery on its natural paper background inside the dark viewer; do not invert the document contents[cite: 3].

### 2.2 Responsive and Typography Repairs

- **Breakpoints:** Desktop (1440px), Tablet (768px), and Mobile (390px)[cite: 3].
- **Button Wrapping:** Standard action labels must remain a single readable line. Use intrinsic sizing and horizontal padding. Never shrink buttons to the point where text truncates or splits into two broken lines[cite: 3].
- **Touch Targets:** Ensure approximately 44px touch targets for all mobile interactions[cite: 3].
- **Design Ledger:** You must maintain a strict coverage ledger tracking: `ID | Screen/state | Desktop | Tablet | Mobile | Light | Dark | Status`[cite: 3].

---

## 3. Complete Screen and State Inventory (102 States)

Every unique route requires a complete layout. Dialogs and transient states use component variants linked to their parent screen[cite: 3].

### P — Public Website (7 Screens)

- **P01** Landing: hero, app preview, Get started/Explore demo, feature sections, privacy summary, FAQ, footer[cite: 3].
- **P02** Privacy & security overview: explicit data/AI boundaries[cite: 3].
- **P03** Help/FAQ hub[cite: 3].
- **P04** Privacy policy page template[cite: 3].
- **P05** Terms page template[cite: 3].
- **P06** Public 404 and service-unavailable variants[cite: 3].
- **P07** Demo entry/reset/exit (`/demo`): persistent sample-data label, no personal uploads[cite: 3].

### A — Authentication and Security (10 Screens)

- **A01** Sign in (Email/Password + Google)[cite: 3].
- **A02** Sign up with field validation[cite: 3].
- **A03** Verification pending & resend cooldown[cite: 3].
- **A04** Verification successful, expired-link, and invalid-link variants[cite: 3].
- **A05** Forgot password form[cite: 3].
- **A06** Set new password & reset success[cite: 3].
- **A07** Auth loading, invalid credentials, disabled account states[cite: 3].
- **A08** Session expired modal (preserves underlying form data)[cite: 3].
- **A09** Recent-authentication dialog for sensitive actions[cite: 3].
- **A10** Optional configured MFA challenge and enrollment[cite: 3].

### O — Complete Onboarding (12 Screens)

- **O01** Welcome and benefits[cite: 3].
- **O02** Locale setup: Country, NGN currency, Africa/Lagos timezone[cite: 3].
- **O03** Receipt privacy and Gemini AI explanation[cite: 3].
- **O04** Reminder preferences (In-app vs browser push)[cite: 3].
- **O05** First-purchase choice: receipt, manual, sample, or skip[cite: 3].
- **O06** Receipt selected: client-side canvas redaction and preview[cite: 3].
- **O07** Uploading and Gemini extraction queued states[cite: 3].
- **O08** Editable extraction review (showing mismatch flags)[cite: 3].
- **O09** Manual first-purchase form[cite: 3].
- **O10** Purchase saved & timeline introduction[cite: 3].
- **O11** Setup checklist post-onboarding[cite: 3].
- **O12** Resume onboarding and skipped variants[cite: 3].

### D — Dashboard Overview (4 Screens)

- **D01** First-time empty dashboard[cite: 3].
- **D02** Populated dashboard: attention queue, recent purchases, spending summary[cite: 3].
- **D03** Partial data, offline, and loading variants[cite: 3].
- **D04** Post-skip setup checklist banner[cite: 3].

### I — Import, Extraction, and Confirmation (11 Screens)

- **I01** Add-purchase choice[cite: 3].
- **I02** Desktop drag/drop & mobile picker[cite: 3].
- **I03** Preview and Canvas Redaction interface[cite: 3].
- **I04** Unsupported type / Oversized file (10MB) rejection[cite: 3].
- **I05** Cloudinary upload progress bar[cite: 3].
- **I06** Queue delay / Gemini free-tier capacity reached[cite: 3].
- **I07** Extraction failed with manual-entry fallback[cite: 3].
- **I08** Receipt review (side-by-side desktop, tabbed mobile)[cite: 3].
- **I09** Missing fields / totals mismatch warnings[cite: 3].
- **I10** Saving, save failed, retry, and successful save[cite: 3].
- **I11** Unsaved changes & tab-conflict resolution[cite: 3].

### U — Purchases (6 Screens)

- **U01** Purchase list with filters and pagination[cite: 3].
- **U02** Empty list & filtered no results[cite: 3].
- **U03** Purchase detail (transaction, line items, linked products)[cite: 3].
- **U04** Edit purchase and notes[cite: 3].
- **U05** Delete confirmation[cite: 3].
- **U06** Record refund/return status[cite: 3].

### R — Owned Products (6 Screens)

- **R01** Inventory grid/list[cite: 3].
- **R02** Product detail (timeline, documents, safety evidence)[cite: 3].
- **R03** Edit product & Open Food Facts enrichment comparison[cite: 3].
- **R04** Add service/repair event[cite: 3].
- **R05** Ownership state change (returned, sold, disposed)[cite: 3].
- **R06** Unknown product / missing image fallback[cite: 3].

### W — Returns and Warranties (8 Screens)

- **W01** Combined overview (List + Calendar view)[cite: 3].
- **W02** Return detail with counting basis[cite: 3].
- **W03** Warranty detail with coverage[cite: 3].
- **W04** Add/edit return policy[cite: 3].
- **W05** Add/edit warranty details[cite: 3].
- **W06** Unconfirmed policy vs Confirmed policy variants[cite: 3].
- **W07** Reminder controls & mark returned[cite: 3].
- **W08** Warranty PDF extraction review (Phase 2 feature)[cite: 3].

### S — Safety Alerts (7 Screens)

- **S01** Alert list (unread/reviewed/dismissed)[cite: 3].
- **S02** Match detail with CPSC/openFDA official source[cite: 3].
- **S03** Field comparison (matching brand vs missing serial)[cite: 3].
- **S04** Add missing identifier input[cite: 3].
- **S05** Mark reviewed / dismiss notice[cite: 3].
- **S06** No matching notice / unsupported coverage region[cite: 3].
- **S07** AI explanation of hazard and remedy[cite: 3].

### C — Spending (4 Screens)

- **C01** Currency selection, category/retailer breakdown[cite: 3].
- **C02** Chart detail with linked records[cite: 3].
- **C03** Accessible table/text alternative for charts[cite: 3].
- **C04** Empty data and refund-adjusted totals[cite: 3].

### V — Documents Vault (6 Screens)

- **V01** Document library gallery[cite: 3].
- **V02** Receipt/image zoomable viewer[cite: 3].
- **V03** Warranty document preview[cite: 3].
- **V04** Upload/replace/delete[cite: 3].
- **V05** Missing/processing document errors[cite: 3].
- **V06** Cloudinary storage usage meter[cite: 3].

### N — Notifications (4 Screens)

- **N01** Header notification popover[cite: 3].
- **N02** Full inbox[cite: 3].
- **N03** Read/unread/mark all read[cite: 3].
- **N04** Permission state variants[cite: 3].

### T — Settings, Privacy, and Help (12 Screens)

- **T01** Settings shell[cite: 3].
- **T02** Profile and locale[cite: 3].
- **T03** Appearance (System/Light/Dark)[cite: 3].
- **T04** Reminder preferences[cite: 3].
- **T05** Security (Sign out everywhere)[cite: 3].
- **T06** Sign-out-all confirmation[cite: 3].
- **T07** Privacy: AI toggle and retention[cite: 3].
- **T08** Export data to ZIP[cite: 3].
- **T09** Cryptographic Account Deletion flow[cite: 3].
- **T10** Help & Walkthrough Learning Center[cite: 3].
- **T11** Support/Feedback surface[cite: 3].
- **T12** Signed-out confirmation[cite: 3].

### H — Household Expansion (Phase 2) (5 Screens)

- **H01** Household list[cite: 3].
- **H02** Invite states[cite: 3].
- **H03** Member roles[cite: 3].
- **H04** Explicit item sharing[cite: 3].
- **H05** Permission revocation[cite: 3].

---

## 4. Onboarding and 11-Module Learning Center

Do not force a linear tutorial. Provide a Learning Center (`T10`) featuring 11 specific, replayable walkthrough modules[cite: 3]. Use sample data for teaching—never trigger real mutations during the tour[cite: 3].

1.  **Overview:** Attention queue, deadlines, recent purchases[cite: 3].
2.  **Add purchase:** Upload vs manual, review, confirmation[cite: 3].
3.  **Purchases:** Search, transaction detail, editing[cite: 3].
4.  **Products:** Inventory, identifiers, linked purchase[cite: 3].
5.  **Returns & warranties:** Confirm terms, add deadline, mark returned[cite: 3].
6.  **Safety alerts:** Evidence, missing identifiers, official source[cite: 3].
7.  **Spending:** Date/currency filters, chart/table[cite: 3].
8.  **Documents:** Find, preview, download, delete[cite: 3].
9.  **Notifications:** Inbox, preferences, permissions[cite: 3].
10. **Settings:** Appearance, security, export, privacy[cite: 3].
11. **Households (Later Release):** Permissions and sharing[cite: 3].

---

## 5. Intake, Redaction, and AI Extraction Workflow

1.  **Canvas Redaction:** Users mask sensitive PII in the browser before the upload begins.
2.  **Signed Upload:** Next.js requests a Cloudinary SHA-1 signature. The browser uploads the redacted asset directly to Cloudinary, bypassing Vercel's 4.5MB limits.
3.  **Queue Gemini:** The Next.js API writes a `pending` job to Supabase.
4.  **Extraction:** A background route calls Gemini 1.5 Flash using a strict JSON schema[cite: 2].

---

## 6. Data Model, RLS, and Business Logic

The Supabase PostgreSQL schema must enforce strict isolation:

- **Row Level Security (RLS):** `USING (auth.uid() = user_id)`. Direct client reads are scoped mathematically to the authenticated user[cite: 2].
- **Accounting Integrity:** `Total = Subtotal + Tax + Shipping - Discount`. The server rejects unbalanced payloads with a 422 error[cite: 2].
- **Global Sign-Out:** Writing to `profiles.valid_after` instantly invalidates all JWTs issued prior to that timestamp via an RLS Postgres function[cite: 2].

---

## 7. Enrichment, Recalls, and Government APIs

- **Barcode Enrichment:** Next.js API calls Open Food Facts. It must _never_ overwrite user-confirmed model numbers silently[cite: 2].
- **Recall Matching:** Background jobs fetch CPSC and openFDA notices[cite: 2]. Matches are categorized logically (e.g., "Identifier Match", "Possible Match - Verify Serial")[cite: 2]. "No match" is never presented as a guarantee of absolute product safety[cite: 2, 3].

---

## 8. Queue Polling, Keep-Alive, and Infrastructure Limits

- **Job Processing:** Since Vercel limits executions to 10 seconds, background tasks are written to a Postgres `job_queue` table[cite: 2].
- **Project Sleep Prevention:** A free GitHub Actions Cron workflow pings `/api/cron/keep-alive` every 3 days. This executes `SELECT 1` on Supabase to reset the 7-day inactivity pause timer[cite: 2].
- **Rate Limiting:** Users are capped at 5 Gemini extractions per day via an atomic Postgres counter to protect the global 1,500 RPD free tier[cite: 2].
