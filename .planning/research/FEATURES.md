# Feature Landscape

**Domain:** Offline-first Android blood pressure tracker
**Researched:** 2026-04-05
**Overall confidence:** MEDIUM-HIGH

## Executive Summary

Blood pressure tracking products cluster around a stable core: manual logging, history, charts, classification, reminders, and doctor-facing exports. Current category leaders and established apps such as SmartBP, Qardio, MedM, and device-companion ecosystems all reinforce that users expect to record readings quickly, review trends over time, and share a readable report with a clinician.

The market then tends to sprawl. Many apps expand into device sync, cloud backup, caregiver sharing, medication workflows, family profiles, and broad “health hub” functionality. On Google Play, there is also a large low-trust segment filled with ad-heavy apps, fake “phone measures blood pressure” framing, and adjacent trackers for glucose, water, weight, and heart rate. That clutter creates an opening for a privacy-first, single-purpose product.

For this project, the winning move is not feature breadth. It is a tighter core loop with higher polish: instant local-only logging, crystal-clear interpretation, elegant history/trends, and a genuinely useful PDF for medical appointments. Privacy, zero-account setup, and restrained scope are differentiators only if the app still ships the category basics cleanly.

## Table Stakes

Features users broadly expect from a credible blood pressure tracker. Missing these increases churn risk.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Fast manual entry for systolic, diastolic, pulse, date, and time | This is the universal core flow across competitors and the minimum reason to install the app | Low | Date/time should default to now; pulse should be supported because many home cuffs surface it alongside BP |
| Reading history with edit and delete | Users need a trustworthy longitudinal record, not a one-shot logger | Low | Must support correction of mistaken entries; poor editability creates data distrust |
| Trend charts and rolling summaries | Competitors consistently sell history, charts, averages, and trend visibility as the primary value after logging | Medium | Minimum useful views: recent readings, 7/14/30-day summaries, average trend |
| Clear status interpretation of a reading | Users expect immediate context, not raw numbers alone | Medium | For this project, WHO-based interpretation with a clear non-diagnostic disclaimer is sufficient |
| Doctor-friendly PDF export | Report sharing is a standard selling point and directly matches the doctor-visit use case | Medium | Must be printable/readable, not just a data dump |
| Local persistence with explicit privacy messaging | For this product, local-only storage is part of the promise; without trust, privacy-first positioning fails | Low | This is not universal table stakes for the category, but it is table stakes for this product strategy |
| Basic input validation and impossible-value protection | Health apps that accept junk data lose credibility immediately | Low | Enforce plausible ranges and required fields; do not silently save malformed readings |

## Differentiators

Features that materially improve competitive position for a privacy-first minimalist Android app. These are valuable because they strengthen the product thesis instead of broadening it into a health suite.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Exceptional one-hand logging UX | Most apps have the feature list; fewer feel instant, calm, and visually refined | Medium | Large controls, current date/time defaults, clear save state, zero clutter |
| Polished minimalist charts optimized for comprehension | Better chart clarity is a stronger differentiator here than more metrics | High | Focus on readable trend shape, recent averages, and status overlays rather than analyst-style dashboards |
| Privacy-first local-only positioning with no account, no ads, no trackers | The Play Store category has many noisy, low-trust apps; this is a real trust wedge | Medium | Needs a visible, credible privacy story in onboarding and settings |
| Clinician-ready PDF layout | Many apps can “export”; fewer produce a report that actually looks appointment-ready | Medium | Include summary period, latest reading, averages, and clear visual status cues |
| Structured measurement context without notes sprawl | Small metadata can improve usefulness without turning the app into a journaling product | Medium | Good candidates: measurement time, arm side, body position, AM/PM grouping; free-form notes can wait |
| Android Health Connect interoperability | Android now has a standard blood pressure record model, making ecosystem interoperability a strong later differentiator | High | Better long-term path than building many direct vendor integrations early |
| On-device summaries and consistency cues | Users want help seeing patterns, but not necessarily AI or coaching | Medium | Examples: weekly averages, morning/evening grouping, “last 3 readings” comparison, local streak cues |

## Anti-Features

Features to deliberately avoid because they weaken focus, undermine trust, or create large complexity for little v1 value.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Fake “measure blood pressure with your phone camera/fingerprint” claims | Common in low-trust apps and medically misleading | Be explicit that the app logs readings from a real cuff and does not measure BP itself |
| Broad health-suite expansion (glucose, weight, hydration, steps, sleep, BMI dashboards) | Dilutes the single-purpose positioning and expands UI/system scope fast | Stay focused on blood pressure and pulse only in early phases |
| Mandatory accounts, cloud sync, or caregiver portals in v1 | Conflicts directly with privacy-first and offline-first positioning | Keep data local; if sync is ever added later, make it strictly optional |
| AI diagnosis, treatment advice, medication adjustment, or risk scoring | Crosses the project’s medical boundary and creates regulatory/trust risk | Limit interpretation to guideline-based classification plus clear disclaimers |
| Heavy reminder/coaching systems in the first release | Common in the market, but easy to overbuild and hard to make calm | Defer to a later phase unless retention testing shows a clear need |
| Multi-user/family profiles in v1 | Adds data-model and export complexity without serving the core single-user story | Keep one local profile initially |
| Direct Bluetooth integrations for many cuff brands in early phases | Hardware fragmentation and compatibility testing will dominate roadmap time | Prefer manual entry first; consider Health Connect before vendor-by-vendor support |
| Social sharing, competitive streaks, or gamification | Wrong product tone for a calm medical-adjacent utility | Keep motivation subtle and private |

## Feature Dependencies

```text
Manual entry + validation -> History
History -> Trend charts
History + chart summaries -> PDF export
Guideline thresholds -> Reading status interpretation
Structured context fields -> Better filtering/grouping in charts and PDFs
Stable local data model -> Health Connect import/export
Notification scheduling -> Reminders
```

## Category Notes

### Table Stakes That Can Be Deferred Only Carefully

`Reminders` are common enough to be a market expectation, but they are not the strongest first differentiator for this product. A v1 can defer them if and only if the core loop is excellent: fast manual entry, strong trend review, and appointment-ready PDF export. If the core UX is merely average, lack of reminders becomes more noticeable.

`Free-form notes` are also common, but they are not essential to the initial product promise. Structured context fields are a better fit for a minimalist app because they improve later filtering without turning every save into a journaling task.

## MVP Recommendation

Prioritize:

1. Fast manual BP + pulse logging with strong validation
2. History with edit/delete and clean recent-reading review
3. High-quality trend charts with WHO-based status interpretation
4. Clinician-ready PDF export
5. Explicit local-only privacy positioning

Defer:

- Reminders: common but not core to the initial value proposition
- Free-form notes: useful, but structured metadata is a better early fit
- Health Connect interoperability: strategically strong, but not necessary for first validation
- Bluetooth monitor integrations: high complexity and weak fit for initial scope

## Recommendation For Requirements Definition

Treat the first release as a polished manual logging product, not a “comprehensive hypertension platform.” The requirements should lock in the core loop and resist category creep:

- Must have: manual logging, history, trend review, status context, PDF export, local-only storage
- Should have later: reminders, structured context filters, Health Connect sync
- Should avoid: cloud/account architecture, adjacent health metrics, AI medical guidance, hardware-integration breadth

## Sources

- Project context: [/Users/aykanburcak/Documents/Projects/blood-pressure-tracker/.planning/PROJECT.md](/Users/aykanburcak/Documents/Projects/blood-pressure-tracker/.planning/PROJECT.md)
- SmartBP site: https://www.smartbp.app/ (current product positioning and feature set)
- SmartBP FAQ: https://www.smartbp.app/faq (premium features, sync/export details)
- SmartBP App Store listing: https://apps.apple.com/us/app/blood-pressure-tracker-smartbp/id519076558 (detailed feature surface, recent updates)
- MedM Blood Pressure Diary: https://www.medm.com/apps/blood-pressure.html (basic vs premium feature split, offline/cloud positioning)
- MedM device integration examples: https://www.medm.com/sensors/bydoc/pm-01-bpm-app.html and https://www.medm.com/sensors/and_medical/ua-911bt-bpm-health-diary-app.html
- Qardio App: https://qardio.com/qardioapp/ (charts, reminders, sharing, WHO chart interpretation)
- Withings support/export: https://support.withings.com/hc/en-us/articles/201491377-Withings-App-Online-Dashboard-Exporting-my-data
- Android Health Connect records: https://developer.android.com/reference/androidx/health/connect/client/records/BloodPressureRecord
- Android Health Connect aggregate data: https://developer.android.com/health-and-fitness/guides/health-connect/develop/aggregate-data
- WHO hypertension fact sheet: https://www.who.int/news-room/fact-sheets/detail/hypertension

## Confidence Notes

- `HIGH`: Manual logging, history, charts, export, reminders, and sharing are standard category features; multiple official product sources agree.
- `MEDIUM-HIGH`: Health Connect is a strong Android-specific later differentiator; official Android docs confirm the platform support, but many current consumer apps are still mid-transition from Google Fit.
- `MEDIUM`: “Minimalist privacy-first” as the winning wedge is a strategic interpretation from the current market shape rather than a direct claim from vendor docs.
