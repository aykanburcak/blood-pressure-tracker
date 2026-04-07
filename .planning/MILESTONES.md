# Milestones

## v1.1 — Stitch design alignment (in progress, started 2026-04-07)

**Scope:** Phases 6–8 — align tokens, components, and shell with [Stitch reference](https://stitch.withgoogle.com/projects/7766087000680671419). See `.planning/REQUIREMENTS.md` (DS-01–DS-10), `.planning/research/STITCH-SOURCE.md`, `.planning/ROADMAP.md`.

---

## v1.0 — Android v1 (shipped 2026-04-06)

**Scope:** Phases 1–5 (15 plans) — offline-first blood pressure tracker for Android with logging, history, trends, PDF export, and privacy/release alignment.

**Archives:**

- [Roadmap snapshot](milestones/v1.0-ROADMAP.md)
- [Requirements snapshot](milestones/v1.0-REQUIREMENTS.md)

**What shipped:**

- Expo SDK 55 app shell: tabs, first-run privacy, Apple Health–inspired empty states  
- Readings in SQLite (Drizzle): add / edit / delete, WHO-based interpretation, non-diagnostic copy  
- History list + Skia/Victory trend chart + rolling summaries  
- PDF report for date range + Android share sheet  
- Settings **Privacy & data**, `allowBackup: false`, Play-oriented **RELEASE-CHECKLIST**  
- Automated tests: 16 Jest suites / 45 tests at milestone close; Phase 4 & 5 UAT passed on device  

**Verification:** Phase UAT files under `.planning/phases/*/` (e.g. `04-UAT.md`, `05-UAT.md`).

---
