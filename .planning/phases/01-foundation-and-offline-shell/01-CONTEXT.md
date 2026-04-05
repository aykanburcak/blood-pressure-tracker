# Phase 1: Foundation and Offline Shell - Context

**Gathered:** 2026-04-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 1 establishes the app shell for an offline-first blood pressure tracker. It must let users open the app without sign-in friction, understand the local-only privacy posture immediately, and navigate a stable foundation that later phases can fill in. This phase does not add logging, history management, trends, or export capabilities beyond the shell and empty-state framing needed to support them.

</domain>

<decisions>
## Implementation Decisions

### App shell structure
- **D-01:** The app should use tabs from day one rather than a single-screen shell.
- **D-02:** The initial tab bar should include `Home`, `History`, and `Settings`.
- **D-03:** The Phase 1 shell should feel like the long-term product structure, not a temporary starter layout.

### Privacy framing
- **D-04:** The local-only privacy message should appear as a dedicated full-screen first-run card before the user enters the main shell.
- **D-05:** This first-run privacy screen should clearly explain that readings stay on the device and that the product is designed around privacy-first local storage.

### Dashboard empty state
- **D-06:** Before any readings exist, the dashboard should use an Apple Health-style summary shell rather than a sparse blank screen or a single guided CTA.
- **D-07:** The empty dashboard should already feel like a polished health dashboard, even without data.

### Visual direction
- **D-08:** Phase 1 should lean into a close homage to Apple Health's white, airy, soft clinical card-based look.
- **D-09:** The interface should feel calm and premium immediately, not defer the main visual identity to a later phase.

### Phase 1 behavior for not-yet-built areas
- **D-10:** The `History` tab should exist in Phase 1 and show the intended final screen structure with an empty-state message explaining that readings will appear there.
- **D-11:** The app should avoid "coming soon" messaging for the History tab; it should look like a real part of the product, just without data yet.

### the agent's Discretion
- Exact icon set for the tabs
- Specific copy wording for the privacy explanation, as long as it preserves the local-only meaning and non-diagnostic product framing
- Precise spacing, typography, and component tokens within the Apple Health-inspired direction

</decisions>

<specifics>
## Specific Ideas

- The shell should feel stable from the first release, not like an MVP that will later be restructured.
- The product should present privacy as part of the experience, not as buried settings copy.
- Empty states should still feel beautiful and intentional, especially on the dashboard and History tab.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase definition
- `.planning/ROADMAP.md` — Defines Phase 1 goal, success criteria, and fixed scope boundary.
- `.planning/REQUIREMENTS.md` — Defines the Phase 1 requirements `CORE-01`, `CORE-02`, and `CORE-03`.

### Product direction
- `.planning/PROJECT.md` — Captures the design-first, privacy-first, Apple Health-inspired product intent and out-of-scope boundaries.

### Project state
- `.planning/STATE.md` — Current project position and sequencing decisions.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None yet — the repository is still greenfield with planning artifacts only.

### Established Patterns
- No implementation patterns exist yet; Phase 1 will establish the initial shell and product conventions.

### Integration Points
- Phase 1 should create the shell that later phases attach to, especially `Home`, `History`, and `Settings` tab surfaces.
- The privacy-first entry flow must connect cleanly to the app shell without introducing account or onboarding infrastructure.

</code_context>

<deferred>
## Deferred Ideas

- Real reading capture and saved latest-reading content belong to Phase 2.
- Actual editable history behavior belongs to Phase 3.
- Trend visualizations and chart data belong to Phase 3.
- PDF export belongs to Phase 4.

</deferred>

---
*Phase: 01-foundation-and-offline-shell*
*Context gathered: 2026-04-05*
