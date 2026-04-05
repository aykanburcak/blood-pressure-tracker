# Domain Pitfalls

**Domain:** Offline-first, privacy-first Android blood pressure tracker
**Researched:** 2026-04-05

## Critical Pitfalls

### Pitfall 1: Turning a single reading into a diagnosis
**What goes wrong:** The app labels one manually entered reading as "you have hypertension," implies urgency too aggressively, or otherwise crosses from contextual guidance into diagnosis.
**Why it happens:** Teams collapse "show helpful interpretation" into "tell the user what condition they have." They also forget that WHO defines hypertension clinically across repeated measurements on different days, not from one isolated reading.
**Consequences:** User harm, loss of trust, Play policy risk, and product copy that reads like an unregulated medical device.
**Warning signs:** Store listing or UI copy says "diagnose," "detects hypertension," "medical-grade insight," or treats one reading as definitive. Alert states are based on a single entry without context.
**Prevention:** Use wording like "reading category" or "this reading is in the X range." Keep a persistent non-diagnostic disclaimer near interpretation surfaces and in export. Reserve urgent copy for clearly high values and route to "seek medical attention" language rather than medical advice. Keep the logic source-labeled and versioned.
**Which phase should address it:** Phase 1 - Medical boundaries, interpretation rules, and content review.
**Detection:** Content audit catches diagnostic language; interpretation tests verify copy for normal, elevated, stage, and crisis thresholds.

### Pitfall 2: Mixing blood-pressure standards without saying which one is used
**What goes wrong:** The product says "WHO-based" but uses AHA/ACC 130/80 staging in one surface and WHO/clinical 140/90 framing in another, or changes thresholds later without migration or release notes.
**Why it happens:** Teams pull ranges from different articles, PDFs, or chart assets. Blood pressure categories differ by organization and use case.
**Consequences:** Inconsistent chart colors, contradictory trend summaries, confused users, and hard-to-defend product behavior.
**Warning signs:** Design mocks, copy docs, and code constants disagree. PDF export, dashboard cards, and entry-detail screens show different labels for the same value.
**Prevention:** Choose one interpretation system for v1 and document it in code and content. Put thresholds in a single versioned rules module. Add product copy that names the standard being used. If you must display another framing later, show it as an alternate view, not mixed defaults.
**Which phase should address it:** Phase 1 - Clinical framing and content system.
**Detection:** Snapshot tests for category rendering across all surfaces using the same fixture values.

### Pitfall 3: Data model too thin for trustworthy trends and export
**What goes wrong:** The app stores only systolic/diastolic values and loses date precision, timezone, pulse, source, notes about repeated readings, or edit history. Later, charts and PDF exports cannot explain what the reading actually represents.
**Why it happens:** Teams optimize the first logging screen and under-design the record schema.
**Consequences:** Ambiguous history, broken sorting, bad summaries, poor doctor-facing exports, and migration pain when adding fields later.
**Warning signs:** Schema uses display strings instead of typed fields. Timestamps are local-formatted text. There is no distinction between a single reading and a session with repeated readings.
**Prevention:** Define a durable reading model up front: numeric systolic/diastolic, optional pulse, measured-at timestamp in UTC plus local rendering, created-at/updated-at, source=`manual`, and a grouping concept for same-session repeated readings if you plan to average. Treat export needs as schema input, not an afterthought.
**Which phase should address it:** Phase 1 - Data model and persistence contract.
**Detection:** Export and chart prototypes should be built from the same domain model before UI polish starts.

### Pitfall 4: Encouraging bad measurement behavior and then charting garbage
**What goes wrong:** Users enter one rushed reading, over clothes, after activity, at inconsistent times, and the app turns it into polished but misleading trends.
**Why it happens:** Teams focus on low-friction entry and skip measurement guidance because it feels like onboarding friction.
**Consequences:** The product looks precise while operating on noisy data; users distrust the app when readings feel random.
**Warning signs:** No guidance on resting, posture, cuff placement, or taking two readings one minute apart. No distinction between raw single readings and averaged sessions.
**Prevention:** Keep entry fast, but include lightweight technique guidance at the moment it matters: first-run tip, inline "measure correctly" sheet, and optional "add second reading" flow. Where possible, summarize trends from session averages while preserving individual values.
**Which phase should address it:** Phase 2 - Logging UX and input quality.
**Detection:** UAT should verify that a new user learns the minimum correct measurement flow without reading a long tutorial.

### Pitfall 5: Misleading charts through bad axes, aggregation, or visual hierarchy
**What goes wrong:** Dynamic y-axes exaggerate tiny changes, systolic dominates while diastolic disappears, sparse data gets smoothed into fake trends, or chart colors imply clinical certainty that the data does not support.
**Why it happens:** Teams optimize for visual drama or generic chart-library defaults instead of clinical readability.
**Consequences:** Users infer improvement or deterioration that is mostly chart artifact. Doctors may distrust exports if the visuals feel manipulated.
**Warning signs:** Auto-fit axes without meaningful baselines, aggressive smoothing, unreadable dual-series plots, or no indication of target/threshold ranges.
**Prevention:** Anchor charts to medically meaningful ranges, not only local min/max. Show systolic and diastolic clearly as a pair. Avoid smoothing unless it is explicit and reversible. Distinguish single-point history from averaged trends. Use threshold bands carefully and keep the legend obvious.
**Which phase should address it:** Phase 3 - Trends and chart system.
**Detection:** Review charts using fixtures with flat data, noisy data, sparse data, and outliers; verify the visual story stays honest.

### Pitfall 6: "Local-only" promise broken by Android backup, temp files, logs, or analytics
**What goes wrong:** The app markets itself as private and local-only, but records are included in Auto Backup, written to shared storage, leaked in debug logs, or sent to third-party crash/reporting tools.
**Why it happens:** Teams think "no backend" automatically means "private." Android defaults and dev tooling say otherwise.
**Consequences:** Trust collapse, inaccurate Play Data safety declarations, and potential exposure of sensitive health data.
**Warning signs:** `allowBackup` left at default with no explicit decision, no backup rules, PDFs written to public directories, analytics SDKs added casually, logging of raw readings in development.
**Prevention:** Make privacy a concrete storage policy. Decide explicitly whether readings participate in Android backup, and if yes, document it honestly; if no, exclude them with backup rules. Keep records in internal storage, not shared external storage. Ban raw reading logs. Avoid third-party analytics in v1 unless you can defend every data flow.
**Which phase should address it:** Phase 2 - Storage/privacy hardening, before release work starts.
**Detection:** Test backup/restore on physical devices, inspect app files, and review all SDK network traffic and log output.

### Pitfall 7: Encryption theater instead of a real local security model
**What goes wrong:** Teams say the app is encrypted but store data in plain SQLite, keep keys in app code, back up encrypted files incorrectly, or fail to protect generated exports.
**Why it happens:** "Use encryption" gets treated as a checkbox rather than a threat model.
**Consequences:** False security claims, brittle implementations, and sensitive data exposure on rooted devices, backups, or shared files.
**Warning signs:** No documented threat model. Secrets or DB passwords live in JS constants. Encrypted files are still included in backup. Temporary PDF files persist after sharing.
**Prevention:** Define what threats v1 actually mitigates. If encrypting at rest, keep keys in Android Keystore and understand backup behavior. Exclude encrypted app data from backup when required. Treat PDF generation as sensitive data handling: create in app-private storage, share through secure Android mechanisms, and clean up temp artifacts.
**Which phase should address it:** Phase 2 - Local security model and export pipeline.
**Detection:** Security review verifies key handling, backup rules, and temp-file lifecycle.

### Pitfall 8: Export that looks nice but is clinically useless
**What goes wrong:** The PDF is visually polished but omits dates/times, units, interpretation basis, enough history, or a layout doctors can skim. Or it includes too much decorative chrome and not enough raw readings.
**Why it happens:** Teams treat PDF as a marketing artifact instead of a handoff document for appointments.
**Consequences:** The export fails the primary real-world use case and users abandon the feature.
**Warning signs:** PDF design starts before defining the information contract. It only shows charts, or only shows a few recent entries, or omits the disclaimer and generation date.
**Prevention:** Design the export around a clinician handoff: user-visible date range, generated-on timestamp, table of readings, optional averages clearly labeled, units, and the interpretation standard used. Make the PDF print-friendly and grayscale-legible. Include a concise non-diagnostic note.
**Which phase should address it:** Phase 4 - Export contract and PDF implementation.
**Detection:** Test with a mock doctor-visit scenario: can someone understand the last 30-90 days in under a minute?

### Pitfall 9: Sharing/export flow leaks data to the wrong place
**What goes wrong:** Export writes files into Downloads or other broadly visible storage, uses unsafe URIs, or makes it unclear whether the file remains on-device after sharing.
**Why it happens:** Teams implement "Save PDF" with the easiest filesystem API rather than a privacy-aware sharing flow.
**Consequences:** Health data becomes accessible to other apps, appears in cloud-syncing folders, or remains behind unexpectedly on the device.
**Warning signs:** Export destination is a world-readable folder by default. No delete-after-share behavior. No explicit user action for choosing where to save.
**Prevention:** Default to app-private generation plus Android share sheet or Storage Access Framework when the user explicitly saves a copy. Explain what happens after export. Give users a way to remove prior exports from inside the app if local retained copies are supported.
**Which phase should address it:** Phase 4 - Secure sharing and export UX.
**Detection:** Verify file visibility with a file manager and on a second app; confirm expected cleanup behavior.

### Pitfall 10: Play Store trust mismatch
**What goes wrong:** The product says "private, local-only, no sharing" in marketing, but the privacy policy, Data safety section, Health apps declaration, or in-app disclosure say something vaguer or contradictory.
**Why it happens:** Product, engineering, and store-listing work happen separately.
**Consequences:** Review friction, rejection risk, and immediate user suspicion on the listing page.
**Warning signs:** No privacy policy URL yet. Data safety answers are guessed late. Store screenshots show diagnosis-like language. In-app disclosure differs from store copy.
**Prevention:** Treat trust copy as a shipped feature. Prepare the privacy policy, Health apps declaration, and Data safety answers from the actual implementation, not intent. Mirror the same plain-language promise in store listing, onboarding, settings, and export screens.
**Which phase should address it:** Phase 5 - Release/compliance hardening.
**Detection:** Run a release-readiness review comparing implementation, policy forms, and all user-facing privacy/medical copy line by line.

## Moderate Pitfalls

### Pitfall 11: No recovery story for a local-only product
**What goes wrong:** Users assume their history is durable, then lose it on uninstall, device loss, or reset.
**Prevention:** Make the durability model explicit. Decide whether Android backup is part of the promise, or whether v1 is intentionally ephemeral unless the user exports PDFs. Say this clearly in onboarding/settings.
**Warning signs:** "Local-only" is presented as purely positive with no explanation of retention or device-change behavior.
**Which phase should address it:** Phase 2 - Privacy/storage policy, revisited in Phase 5 release copy.

### Pitfall 12: Feature creep into a generic health app
**What goes wrong:** The team adds notes, reminders, medication logs, Health Connect, widgets, accounts, or clinician messaging before the core loop is excellent.
**Prevention:** Protect the single-purpose scope. Only add features that improve the primary loop of log -> understand -> review -> export.
**Warning signs:** Backlog items outnumber improvements to entry speed, chart clarity, and export quality.
**Which phase should address it:** Continuous scope control from Phase 1 onward.

### Pitfall 13: Locale and units bugs that corrupt trust
**What goes wrong:** Dates export in ambiguous formats, decimal parsing breaks on some locales, or PDF/chart labels are inconsistent across device language settings.
**Prevention:** Store numerics as numerics, timestamps as machine-readable values, and localize only at render time. Pick one unambiguous export date format.
**Warning signs:** Parsing logic depends on device-formatted strings or `toLocaleString()` for persistence.
**Which phase should address it:** Phase 1 - Domain model, validated again in Phase 4 export.

### Pitfall 14: Accessibility ignored because the product is "minimal"
**What goes wrong:** Chart colors carry meaning alone, tap targets are too small, and interpretation states fail contrast or screen-reader clarity.
**Prevention:** Treat accessibility as part of trust. Use text labels with color, large controls, and accessible summaries for charts and interpretation cards.
**Warning signs:** Red/amber/green is the only signal; chart points and filters are hard to operate; screen readers do not summarize readings clearly.
**Which phase should address it:** Phase 3 - Charts and review surfaces, with regression checks before release.

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Phase 1 - Domain model and interpretation | Locking in the wrong threshold system or a thin record schema | Choose one standard, version it, and define a durable reading entity before UI work expands |
| Phase 2 - Logging and privacy/storage | Claiming local privacy while silently participating in backups or leaking via logs/SDKs | Explicit backup policy, internal storage only, no raw-reading logs, SDK audit |
| Phase 3 - Trends and charts | Beautiful but misleading charts | Use medically meaningful axes, preserve SBP/DBP pairing, test sparse/noisy/outlier datasets |
| Phase 4 - PDF export and sharing | Export that is useless to clinicians or leaks into shared storage | Define clinician-facing PDF contract first; generate privately, share safely, clean temp files |
| Phase 5 - Release and Play Console | Rejection or user mistrust from inconsistent privacy/health declarations | Review privacy policy, Data safety, Health apps declaration, and store copy against shipped behavior |

## Sources

- WHO hypertension fact sheet: clinical hypertension is based on repeated measurements on two different days. HIGH confidence. https://test-cms.who.int/news-room/fact-sheets/detail/hypertension
- American Heart Association home monitoring guidance: rest 5 minutes, take two readings one minute apart, use proper technique, and record results. MEDIUM confidence for home-monitoring UX guidance. https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings/monitoring-your-blood-pressure-at-home
- American Heart Association blood pressure category chart (2025) for current public-facing category thresholds. MEDIUM confidence. https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings/monitoring-your-blood-pressure-at-home/-/media/Files/Health-Topics/High-Blood-Pressure/HBP-rainbow-chart-English.pdf
- BMC Medical Informatics and Decision Making: blood pressure visualizations are often misleading when axes auto-fit narrow ranges and data lacks clinical context. MEDIUM confidence. https://link.springer.com/article/10.1186/s12911-021-01598-4
- Android Developers security best practices: store private data in internal storage; use external/shared storage only for appropriate shared files. HIGH confidence. https://developer.android.com/privacy-and-security/security-best-practices
- Android Developers backup guidance: Auto Backup is enabled by default, almost all app data is backed up unless controlled, and sensitive data may need exclusion or encryption constraints. HIGH confidence. https://developer.android.com/identity/data/autobackup
- Android Developers backup best practices: non-standard export/backup flows can leak sensitive data; exclude or protect sensitive backups. HIGH confidence. https://developer.android.com/privacy-and-security/risks/backup-best-practices
- Android Developers Keystore guidance: protect cryptographic keys with Android Keystore; key material remains non-exportable. HIGH confidence. https://developer.android.com/privacy-and-security/keystore
- AndroidX `EncryptedFile` reference: encrypted files should be excluded from Auto Backup. HIGH confidence. https://developer.android.com/reference/androidx/security/crypto/EncryptedFile
- Google Play Health Content and Services policy: health apps must complete the declaration form, provide a privacy policy, and avoid misleading or harmful health functionality. HIGH confidence. https://support.google.com/googleplay/android-developer/answer/16679511?hl=en
- Google Play Health apps declaration form guidance: accurate declaration is required as part of review. HIGH confidence. https://support.google.com/googleplay/android-developer/answer/14738291?hl=en
