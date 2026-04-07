# Requirements: Blood Pressure Tracker

**Milestone v1.1 — Stitch design alignment**  
**Core value:** Logging and understanding a blood pressure reading should feel instant, private, and visually clear.

**Design reference:** [Stitch — Apple Health BP Tracker](https://stitch.withgoogle.com/projects/7766087000680671419) — summarized in [`.planning/research/STITCH-SOURCE.md`](research/STITCH-SOURCE.md).

## Shipped baseline

v1.0 requirements (CORE, LOG, HIST, INTP, TRND, EXPT, PRIV) — [`.planning/milestones/v1.0-REQUIREMENTS.md`](milestones/v1.0-REQUIREMENTS.md).

## Milestone v1.1 — Active

### Design tokens & typography (DS)

- [x] **DS-01:** App theme exposes Stitch-aligned semantic colors (surface, surface containers, primary / primary emphasis, on-surface, outline variants) and replaces or maps legacy Phase 1 hex values so screens read as the cool white / blue system.
- [x] **DS-02:** Typography roles use headline vs body/label scale matching Stitch intent: load **Manrope** for display/headings and **Inter** for body/labels (with documented system fallback if fonts fail to load).
- [x] **DS-03:** Radius and shadow tokens match the “soft elevation” direction (card radius lg/xl, shadow tinted and low opacity per Stitch notes).

### Components

- [x] **DS-04:** Primary CTA (`PrimaryButton` or equivalent) uses Stitch primary colors and pill or large corner radius; optional primary → primary-container gradient documented in code or tokens.
- [x] **DS-05:** Secondary / neutral pressables use recessed surface styling (no harsh borders) where the app uses secondary actions.
- [x] **DS-06:** `SurfaceCard` and screen backgrounds follow tonal layering (e.g. white cards on `#f9f9fe`-style dominant surface).
- [x] **DS-07:** WHO interpretation chips use soft fills consistent with Stitch “soft state” guidance without reducing contrast below readable levels.

### Shell & screens

- [ ] **DS-08:** Tab bar and header chrome are updated to match Stitch (including optional `expo-glass-effect` only if Android behavior is acceptable; otherwise solid tonal bar with same spacing/icon treatment).
- [ ] **DS-09:** Home, History, Settings, add-reading, and edit-reading flows are visually reviewed: remove or replace divider-heavy patterns with spacing/surface shifts where feasible; no change to medical strings or WHO logic.

### Export & consistency

- [ ] **DS-10:** Generated PDF report remains readable and professional after token changes (adjust HTML template styles if needed).

## Deferred (not v1.1)

Same as prior backlog — reminders, notes, Health Connect, app lock, sync — see **Candidate backlog** below; promote with a later milestone.

## Candidate backlog (unchanged)

**Engagement:** Reminders; optional notes on readings.  
**Ecosystem:** Health Connect; biometric lock; optional account/sync.

## Out of scope (v1.1)

- Changing WHO thresholds, labels, or medical disclaimer semantics.
- New features beyond visual system + component/shell alignment (no new routes or data fields for v1.1 DS milestone).

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DS-01 – DS-03 | 6 | Shipped 2026-04-07 (`06-01-PLAN` executed) |
| DS-04 – DS-07 | 7 | Shipped 2026-04-07 (`07-01-PLAN` executed) |
| DS-08 – DS-10 | 8 | Planned |

---

*Updated: 2026-04-07 — `/gsd-new-milestone` v1.1 Stitch alignment.*
