# Project Research Summary

**Project:** Blood Pressure Tracker
**Domain:** Offline-first, privacy-first Android blood pressure tracking app
**Researched:** 2026-04-05
**Confidence:** HIGH

## Executive Summary

Blood Pressure Tracker should be built as a focused offline-first Android utility, not as a broad health platform. The research is consistent across stack, features, architecture, and pitfalls: credible products in this space win on fast manual logging, trustworthy history and trends, clear non-diagnostic interpretation, and appointment-ready exports. For this project specifically, the product wedge is privacy and restraint: local-only storage, no account, no ads, and a calmer, more polished experience than the noisy blood pressure tracker category.

The recommended implementation path is an Expo-managed React Native app using Expo Router, New Architecture + Hermes, and SQLite as the single source of truth. Persisted readings should flow through a domain layer and repository layer, with trend views and PDF export treated as derived read models over the same canonical records. That keeps the product simple enough for v1 while preserving the right seams for later additions like reminders or Health Connect.

The main risks are not raw engineering difficulty. They are trust failures: slipping into diagnostic language, mixing clinical standards, under-designing the data model, producing misleading charts, or breaking the “local-only” promise through Android backup, temp files, or logs. The roadmap should therefore front-load domain rules and data schema decisions before UI polish expands, then harden privacy and export behavior before release.

## Key Findings

### Recommended Stack

The stack recommendation is strong and coherent: use Expo as the greenfield foundation, keep SQLite at the center, avoid heavyweight state and UI abstractions, and optimize for correctness plus UI polish rather than backend flexibility. This is the right fit for a small-data, local-only, Android-first health utility where chart clarity and export quality matter more than sync or service infrastructure.

The important constraint is architectural discipline. SQLite should own persisted truth from day one, schema migrations should be first-class, and domain rules should be shared across entry, history, charts, and export. The app should not start with Redux, React Query, Realm, or a heavy component kit because none of those solve the primary v1 problem.

**Core technologies:**
- `Expo SDK 55` with `create-expo-app`: app foundation and native workflow support — fastest low-risk path for a modern greenfield React Native app.
- `Expo Router`: navigation and project structure — recommended for greenfield Expo apps and keeps screen boundaries clean.
- `React Native New Architecture + Hermes`: runtime baseline — aligns with the current React Native direction and performance expectations.
- `expo-sqlite`: canonical local persistence — the right storage model for structured readings, filters, trend queries, and exports.
- `Drizzle ORM`: typed schema and migrations — useful for keeping health data evolution disciplined from the first version.
- `Reanimated + Skia + Victory Native`: chart rendering — best fit for clear, polished, non-generic trend visualization.
- `expo-print` + `expo-file-system` + `expo-sharing`: PDF generation and handoff — the cleanest path to clinician-ready export on Android.
- `Zod`: validation boundary — helps enforce plausible value ranges and safe input parsing.

### Expected Features

The category has a clear v1 baseline: users expect fast manual entry, durable history, visual trends, contextual interpretation, and export for appointments. The research strongly argues against trying to win with breadth. This product should instead win with execution quality on the core loop and with a credible privacy story.

**Must have (table stakes):**
- Fast manual entry for systolic, diastolic, pulse, date, and time — this is the core reason to install the app.
- Reading history with edit and delete — users need a trustworthy longitudinal record.
- Trend charts with recent summaries — history alone is not enough; trend visibility is expected.
- Clear WHO-based reading interpretation with non-diagnostic wording — users expect context, not raw numbers only.
- Doctor-friendly PDF export — a real appointment use case, not an optional extra.
- Local persistence with explicit privacy messaging — essential to the product’s positioning, not just implementation detail.
- Strong validation and impossible-value protection — credibility drops immediately if junk data can be saved.

**Should have (competitive):**
- Exceptional one-hand logging UX — faster, calmer input is a real differentiator in this category.
- Polished minimalist charts — chart readability matters more than adding more metrics.
- Privacy-first local-only framing — no account, no ads, no trackers should be visible and credible.
- Clinician-ready PDF layout — better than raw CSV-style export and aligned to real doctor visits.
- Small structured context fields — useful later for filtering and summaries without turning logging into journaling.
- On-device summaries and consistency cues — helpful pattern visibility without drifting into coaching or diagnosis.

**Defer (v2+):**
- Reminders — common, but deferrable if the core loop is excellent.
- Free-form notes — lower-value than structured context fields for this product style.
- Health Connect interoperability — strategically strong, but not needed to validate the initial product.
- Bluetooth cuff integrations — high complexity, poor fit for v1.
- Cloud sync, accounts, caregiver workflows, and family profiles — directly conflict with the privacy-first launch thesis.

### Architecture Approach

The recommended architecture is feature-first over a strict local data core: `UI -> use case/service -> repository -> SQLite`. Persisted health data should be committed to SQLite and then re-read from queries, not mirrored through optimistic in-memory state. Trend views, summaries, and PDF exports should all derive from the same canonical readings and shared rules engine so interpretation cannot drift across surfaces.

**Major components:**
1. App bootstrap and navigation shell — opens the database, runs migrations, loads preferences, mounts providers, and starts routing.
2. Local persistence layer — schema, migrations, SQLite client, and repositories that expose app-level CRUD and query contracts.
3. Domain/use-case layer — validation, WHO-based classification, trend aggregation, and export snapshot shaping.
4. Feature modules — reading capture, history, trends, export, and settings/privacy surfaces.
5. Platform adapters — Android-specific file handling, sharing, backup/privacy rules, and local observability boundaries.

### Critical Pitfalls

1. **Crossing into diagnosis** — keep all interpretation framed as reading categories, not medical conclusions; include persistent non-diagnostic disclaimers.
2. **Mixing blood pressure standards** — choose one standard for v1, version it in a single rules module, and use it consistently across UI and export.
3. **Under-designing the record schema** — store typed values, timestamps, pulse, source, and audit-safe metadata from day one so trends and exports remain trustworthy.
4. **Building misleading charts** — anchor axes to medically meaningful ranges, preserve systolic/diastolic pairing, and avoid deceptive smoothing or exaggerated scaling.
5. **Breaking the local-only promise** — explicitly control Android backup, keep files in internal storage, avoid raw-reading logs, and treat PDF temp files as sensitive artifacts.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Domain Rules and Persistence Foundation
**Rationale:** Everything downstream depends on a durable reading schema and a single interpretation standard. If these are wrong, logging, charts, and export all drift or require painful migrations.
**Delivers:** Expo app shell, navigation shell, SQLite client, schema and migrations, domain models, validation rules, WHO-based classification module, privacy/local-only framing stub.
**Addresses:** Local persistence, validation, clear status interpretation, privacy positioning.
**Avoids:** Diagnostic language, mixed standards, thin data model, locale/timestamp bugs.

### Phase 2: Core Logging Loop
**Rationale:** The product must prove the primary loop before adding derived experiences. Logging quality determines data quality for every later feature.
**Delivers:** Manual entry flow, sensible defaults for date/time, save/edit/delete use cases, latest-reading dashboard slice, recent history preview, lightweight measurement guidance.
**Uses:** SQLite, Zod, feature modules over local state, no heavy global store.
**Implements:** Reading capture feature, history repository contracts, shared validation/classification service.
**Avoids:** Bad measurement behavior, low-trust input flows, junk data persistence, premature scope expansion.

### Phase 3: History, Trends, and Review Surfaces
**Rationale:** Trend views are read models over saved data. They should only start after persisted records and classification logic are stable.
**Delivers:** Full history list, range filters, summary cards, chart pipelines, accessible review surfaces, honest trend visualization.
**Addresses:** Trend charts, rolling summaries, on-device insight cues.
**Uses:** Reanimated, Skia, Victory Native, aggregation services derived from canonical readings.
**Avoids:** Misleading charts, inaccessible color-only semantics, chart logic drifting from stored data.

### Phase 4: Clinician-Ready Export
**Rationale:** Export depends on stable queries, summary logic, and interpretation contracts. It should be a downstream consumer, not the driver of the model.
**Delivers:** Export snapshot builder, HTML-based PDF template, print pipeline, app-private file generation, Android share flow, temp-file cleanup behavior.
**Addresses:** Doctor-friendly PDF export and privacy-aware sharing.
**Uses:** `expo-print`, `expo-file-system`, `expo-sharing`, shared domain rules and repository queries.
**Implements:** Export feature plus file/share adapters at the platform boundary.
**Avoids:** Clinically useless PDFs, export/share leakage, contradictory interpretation between screen and PDF.

### Phase 5: Privacy, Release, and Product Hardening
**Rationale:** Release trust depends on implementation details matching product claims. This phase should tighten privacy, durability, performance, and store compliance after real flows exist.
**Delivers:** Android backup policy and rules, privacy/settings copy, error recovery, migration tests, larger-dataset checks, release policy alignment, store/declaration review.
**Addresses:** Local-only trust story, stability, release readiness.
**Avoids:** Backup leaks, encryption theater, data-loss confusion, Play Store trust mismatch.

### Phase Ordering Rationale

- The roadmap should follow the dependency chain `schema -> logging -> derived review surfaces -> export -> release hardening`.
- Feature grouping should mirror the architecture: foundational data and rules first, then feature modules that consume them, then Android-specific platform edges.
- This ordering keeps the hardest trust risks visible early and prevents charts or exports from inventing their own logic or data contracts.
- It also resists feature creep by validating the core loop before reminders, Health Connect, Bluetooth, or cloud concerns enter the roadmap.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 3:** Chart system design needs deliberate validation around medically meaningful axes, accessibility, and sparse/noisy dataset handling.
- **Phase 4:** PDF information contract and secure export/share behavior need focused planning because “looks polished” is not enough in this domain.
- **Phase 5:** Android backup/privacy policy and Play health declarations need implementation-specific review before release decisions are finalized.

Phases with standard patterns (skip research-phase):
- **Phase 1:** Expo bootstrap, SQLite foundation, and migration setup are well-documented and low-ambiguity.
- **Phase 2:** Manual entry, local validation, and CRUD flows follow standard offline-app patterns once the schema is settled.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Strongly grounded in official Expo, React Native, and Android guidance; only chart/ORM choices are more ecosystem-sensitive. |
| Features | MEDIUM-HIGH | Category table stakes are well-supported across competitors and official platform docs; differentiator strategy is still partly market interpretation. |
| Architecture | HIGH | Local-first structure, repository layering, and Android privacy boundaries are well-supported and fit the product cleanly. |
| Pitfalls | HIGH | The main risks are backed by official Android/Play guidance and established medical/trust constraints in this category. |

**Overall confidence:** HIGH

### Gaps to Address

- Chart interaction specifics: validate whether the chosen Skia/Victory composition delivers the exact accessibility and readability needed before locking implementation details.
- Classification standard wording: confirm the final user-facing copy and whether WHO-only framing is sufficient for the intended market and release materials.
- Durability policy: decide explicitly whether Android backup is part of the product promise or whether v1 remains local-to-device unless the user exports data.
- Export contract details: validate how much history, which summaries, and what date formatting clinicians find most usable in the PDF.
- Security model scope: decide whether v1 claims only private local storage or also adds true at-rest encryption with Keystore-backed key handling.

## Sources

### Primary (HIGH confidence)
- Expo docs — project bootstrap, Router, development builds, CNG, SQLite, Print, Sharing, FileSystem, SecureStore, LocalAuthentication, DateTimePicker, New Architecture guidance.
- React Native docs — framework recommendation, Hermes, New Architecture direction.
- Android Developers docs — Health Connect blood pressure model, backup behavior, storage guidance, security best practices, Android Keystore.
- Google Play policy/docs — health apps declaration, privacy policy expectations, Data safety alignment.
- WHO hypertension fact sheet — repeated-measurement clinical framing and non-diagnostic caution.

### Secondary (MEDIUM confidence)
- Drizzle docs — Expo SQLite integration and migration workflow.
- React Native Reanimated docs — animation and interaction support.
- React Native Skia docs — high-performance graphics path.
- Victory Native XL docs/repository — charting primitives for React Native.
- React Native Testing Library and Maestro docs — test strategy fit for this stack.
- American Heart Association guidance — home measurement technique and public-facing category materials.

### Tertiary (LOW confidence)
- SmartBP, Qardio, MedM, and Withings product materials — used to identify table stakes, category patterns, and market positioning.
- Visualization literature on blood pressure charting — informs trend honesty and axis/aggregation cautions, but still needs implementation-specific validation.

---
*Research completed: 2026-04-05*
*Ready for roadmap: yes*
