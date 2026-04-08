# Retrospective — Blood Pressure Tracker

Living log of milestone learnings. Append new sections at the top of the milestone area (below this intro).

---

## Milestone: v1.2 — Home pressure trends card

**Shipped:** 2026-04-08  
**Phases:** 1 | **Plans:** 1

### What was built

Single Home **Pressure trends** card: averages for the chart window, `BpHomeBarChart` with one **range** bar per reading (diastolic → systolic), fill color from the extended **Blood Pressure Chart** bands (worst of sys/dia); `bp-chart-bands` + Jest; WHO chip and non-diagnostic disclaimer preserved; History keeps the line chart.

### What worked

- One plan (`09-01`) covered HOME-01–HOME-06 with a clear UI-SPEC and existing Victory/Skia path.  
- Capsule range bars matched the Stitch-style reference better than side-by-side systolic/diastolic columns.

### What was inefficient

- GSD `requirements mark-complete` did not match checkboxes formatted as `**HOME-01:**` (colon inside bold); checkboxes were updated manually in the v1.2 requirements archive.  
- Roadmap phase headings must use `### Phase N: Title` for `phase-op` tooling; em-dash form failed until fixed.

### Key lessons

- Keep roadmap milestone bullets ordered so tooling that takes the **first** `vX.Y` in the file still points at the latest shipped version when between milestones.  
- Record `*-SUMMARY.md` before `milestone complete` so accomplishments flow into `MILESTONES.md`.

---

## Milestone: v1.0 — Android v1

**Shipped:** 2026-04-06  
**Phases:** 5 | **Plans:** 15

### What was built

Private, local-only Android BP tracker: shell + logging + history/trends + PDF export + privacy hardening (in-app privacy detail, no Android Auto Backup, release checklist).

### What worked

- Phased roadmap matched dependency order (data → UI → export → privacy).  
- SQLite + Drizzle + Zod kept health data structured and testable.  
- UI-SPEC + RNTL per phase caught regressions (tabs, export, privacy screen).

### What was inefficient

- Some phases lacked `*-SUMMARY.md` files early; `roadmap analyze` still reports partial summary counts — worth generating summaries when closing each phase.  
- Typed routes (`.expo/types/router.d.ts`) need manual updates when adding stack screens unless Expo regenerates.

### Patterns established

- HTML → PDF via `expo-print`; temp file cleanup after share.  
- Long-form privacy copy in a dedicated module; Settings entry; manifest aligned with claims.

### Key lessons

- Android `datetime` picker mode required date+time sequence, not `datetime` mode.  
- `allowBackup: false` is the simple CNG-friendly match for “no cloud backup of app DB.”

### Cost observations

- Not tracked in-repo.

---

## Cross-milestone trends

| Milestone | Phases | Plans | Notes |
|-----------|--------|-------|--------|
| v1.2 | 1 | 1 | Home pressure trends card |
| v1.0 | 5 | 15 | First shipped Android v1 |

---
