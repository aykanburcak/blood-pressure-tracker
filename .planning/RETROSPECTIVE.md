# Retrospective — Blood Pressure Tracker

Living log of milestone learnings. Append new sections at the top of the milestone area (below this intro).

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
| v1.0 | 5 | 15 | First shipped Android v1 |

---
