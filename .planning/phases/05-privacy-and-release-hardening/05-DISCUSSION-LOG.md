# Phase 5: Privacy and Release Hardening - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in `05-CONTEXT.md`.

**Date:** 2026-04-06
**Phase:** 5 — Privacy and Release Hardening
**Areas discussed:** In-app privacy surface (PRIV-02); Android backup; Release / Play alignment; Third-party / network boundaries

---

## 1. In-app privacy surface (PRIV-02)

| Option | Description | Selected |
|--------|-------------|----------|
| A — Recommended | Long-form reviewable screen + Settings link; first-run stays short; single source for strings | ✓ |
| B | Settings cards only, no dedicated screen | |
| C | Expand first-run only | |

**User's choice:** Selected **all** discussion areas; applied **Option A** (recommended).
**Notes:** Wire existing Settings **About** chevron or add **Privacy** row; extend `privacy-copy.ts` or sibling module; align `tokens.ts` `copy.*`.

---

## 2. Android backup / device transfer

| Option | Description | Selected |
|--------|-------------|----------|
| A — Recommended | Exclude DB from auto-backup + plain-language OS backup note in copy | ✓ |
| B | Document platform default only, no manifest change | |
| C | Agent discretion on default | |

**User's choice:** Applied **Option A** (recommended) after user selected all areas.
**Notes:** Expo 55 / CNG path TBD in research.

---

## 3. Release / Play alignment

| Option | Description | Selected |
|--------|-------------|----------|
| A — Recommended | In-repo `.planning/RELEASE-CHECKLIST.md` (Data safety, permissions, deps) | ✓ |
| B | Console-only, no repo artifact | |
| C | Minimal README bullet only | |

**User's choice:** Applied **Option A** (recommended).

---

## 4. Third-party / network boundaries

| Option | Description | Selected |
|--------|-------------|----------|
| A — Recommended | Assert no analytics/ads in current deps; no `expo-updates` in v1 tree; re-verify at release | ✓ |
| B | Add OTA disclaimer preemptively | |

**User's choice:** Applied **Option A** (recommended); OTA wording only if dependency added later.

---

## the agent's Discretion

- Android backup implementation shape; privacy screen IA; About vs Play Store link behavior.

## Deferred Ideas

- Biometric lock, Health Connect, cloud sync — future phases per `REQUIREMENTS.md`.
