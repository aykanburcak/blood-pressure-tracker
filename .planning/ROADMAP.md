# Roadmap: Blood Pressure Tracker

## Overview

This roadmap follows the trust-critical dependency chain for a private blood pressure app: establish the offline shell and product boundaries first, prove the logging loop on top of stable domain rules, expand into history and trend review, add clinician-ready PDF export as a downstream consumer of canonical readings, then harden privacy and release details so the shipped product matches its claims.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation and Offline Shell** - Establish the account-free, offline-first app shell and first-run privacy framing.
- [ ] **Phase 2: Core Logging and Interpretation** - Deliver the fast manual entry loop with immediate saved-reading feedback.
- [ ] **Phase 3: History and Trends** - Turn persisted readings into editable history and trustworthy trend review.
- [ ] **Phase 4: PDF Export** - Generate and share appointment-ready PDF reports from saved readings.
- [ ] **Phase 5: Privacy and Release Hardening** - Tighten privacy claims, local-only boundaries, and release readiness.

## Phase Details

### Phase 1: Foundation and Offline Shell
**Goal**: Users can open a private, offline-first blood pressure tracker without sign-in friction and immediately understand the app's local-only posture.
**Depends on**: Nothing (first phase)
**Requirements**: CORE-01, CORE-02, CORE-03
**Success Criteria** (what must be TRUE):
  1. User can open the app and reach the main dashboard without creating an account or signing in.
  2. User sees a brief first-run explanation that readings stay on the device and that the app is designed for local-only use.
  3. User can launch and use the app's core surfaces while the device is offline without being blocked by network requirements.
**Plans**: 3 plans
Plans:
- [x] 01-01-PLAN.md - Bootstrap the Expo Router foundation, local flag storage boundary, and test harness.
- [x] 01-02-PLAN.md - Implement the first-run privacy gate and durable tab routing contract.
- [x] 01-03-PLAN.md - Build the approved empty-state shell surfaces and final Phase 1 verification.
**UI hint**: yes

### Phase 2: Core Logging and Interpretation
**Goal**: Users can quickly record a valid reading and immediately understand its latest saved context through consistent WHO-based interpretation.
**Depends on**: Phase 1
**Requirements**: LOG-01, LOG-02, LOG-03, LOG-04, HIST-04, INTP-01, INTP-02, INTP-03
**Success Criteria** (what must be TRUE):
  1. User can enter systolic, diastolic, pulse, and timestamp details in a dedicated add-reading flow with the current date and time prefilled.
  2. User cannot save a reading when required values are missing or outside supported ranges, and can save a valid reading with one clear primary action.
  3. User receives immediate confirmation after saving and can see the latest reading summary on the main dashboard.
  4. User sees WHO-based status context for the saved reading with color support and explicit non-diagnostic framing.
  5. User's saved readings remain available after closing and reopening the app.
**Plans**: 3 plans
Plans:
- [ ] 02-01-PLAN.md - Drizzle readings schema, migrations, and repository with tests.
- [ ] 02-02-PLAN.md - Zod validation, WHO classification, disclaimer, interpretation tokens.
- [ ] 02-03-PLAN.md - Add-reading route and Home latest-reading UI with RNTL coverage.
**UI hint**: yes

### Phase 3: History and Trends
**Goal**: Users can review, correct, and understand their stored readings through trustworthy history and trend surfaces.
**Depends on**: Phase 2
**Requirements**: HIST-01, HIST-02, HIST-03, TRND-01, TRND-02, TRND-03
**Success Criteria** (what must be TRUE):
  1. User can browse saved readings in reverse chronological order and open an individual reading for review.
  2. User can edit or delete a saved reading from local history and see history reflect the change accurately.
  3. User can view a timeline chart of saved readings that preserves systolic and diastolic pairing from the underlying records.
  4. User can review recent-period trend summaries derived from persisted readings rather than transient UI state.
**Plans**: TBD
**UI hint**: yes

### Phase 4: PDF Export
**Goal**: Users can turn saved blood pressure history into a clinician-friendly PDF and hand it off through native Android sharing flows.
**Depends on**: Phase 3
**Requirements**: EXPT-01, EXPT-02, EXPT-03
**Success Criteria** (what must be TRUE):
  1. User can generate a PDF report for a selected time range from saved readings.
  2. User can share or save the generated PDF through standard Android sharing flows.
  3. The exported PDF presents readable blood pressure history and summary context that is suitable to bring to a medical appointment.
**Plans**: TBD
**UI hint**: yes

### Phase 5: Privacy and Release Hardening
**Goal**: Users can trust the shipped product's privacy claims because the app experience and release boundaries stay aligned with the local-only promise.
**Depends on**: Phase 4
**Requirements**: PRIV-01, PRIV-02
**Success Criteria** (what must be TRUE):
  1. User can use the released app without encountering ads, account creation, or cloud-sync setup in v1.
  2. User can find in-app privacy copy that clearly explains local-only storage and the PDF export boundary.
  3. The shipped app behavior matches its privacy framing, so users are not prompted toward any network-backed storage or onboarding flows.
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation and Offline Shell | 0/3 | Not started | - |
| 2. Core Logging and Interpretation | 0/TBD | Not started | - |
| 3. History and Trends | 0/TBD | Not started | - |
| 4. PDF Export | 0/TBD | Not started | - |
| 5. Privacy and Release Hardening | 0/TBD | Not started | - |
