# Requirements: Blood Pressure Tracker

**Defined:** 2026-04-05
**Core Value:** Logging and understanding a blood pressure reading should feel instant, private, and visually clear.

## v1 Requirements

### Core Experience

- [ ] **CORE-01**: User can open the app and reach the main dashboard without creating an account or signing in.
- [ ] **CORE-02**: User sees a brief first-run privacy explanation that states readings are stored locally on the device.
- [ ] **CORE-03**: User can use the app's core logging, history, trends, and export features without requiring network access.

### Logging

- [ ] **LOG-01**: User can manually enter systolic, diastolic, and pulse values in a dedicated add-reading flow.
- [ ] **LOG-02**: User can review and change the reading date and time, with the default set to the current moment.
- [ ] **LOG-03**: User cannot save a reading when required values are missing or outside supported validation ranges.
- [ ] **LOG-04**: User can save a valid reading with a single primary action and receives immediate confirmation that it was recorded.

### History

- [ ] **HIST-01**: User can view saved readings in reverse chronological order.
- [ ] **HIST-02**: User can open a saved reading and edit its values and timestamp.
- [ ] **HIST-03**: User can delete a saved reading from the local history.
- [ ] **HIST-04**: User's saved readings remain available after closing and reopening the app.

### Interpretation

- [ ] **INTP-01**: User can see a WHO-based status classification for each saved reading.
- [ ] **INTP-02**: User can see color-supported reading context without the app presenting the result as medical diagnosis or treatment advice.
- [ ] **INTP-03**: User can view the latest reading summary from the main dashboard immediately after saving a reading.

### Trends

- [ ] **TRND-01**: User can view a timeline chart of saved blood pressure readings.
- [ ] **TRND-02**: User can review trend summaries for recent periods from persisted readings.
- [ ] **TRND-03**: User can use trend views that preserve paired systolic and diastolic information from the underlying readings.

### Export

- [ ] **EXPT-01**: User can generate a PDF report of saved readings for a selected time range.
- [ ] **EXPT-02**: User can share or save the generated PDF through standard Android sharing flows.
- [ ] **EXPT-03**: User's PDF export includes readable blood pressure history and summary context suitable for a medical appointment.

### Privacy

- [ ] **PRIV-01**: User can use the app without ads, account creation, or cloud-sync setup in v1.
- [ ] **PRIV-02**: User can view in-app privacy copy that explains the local-only storage model and export boundary.

## v2 Requirements

### Engagement

- **ENG-01**: User can schedule reminders for future blood pressure checks.
- **ENG-02**: User can optionally attach free-form notes to a reading.

### Ecosystem

- **ECOS-01**: User can sync blood pressure records with Android Health Connect.
- **ECOS-02**: User can protect the app with biometric app lock.
- **ECOS-03**: User can back up or sync data across devices with an optional account-based flow.

## Out of Scope

| Feature | Reason |
|---------|--------|
| iOS release | The first product release is intentionally Android-only |
| Cloud sync in v1 | Conflicts with the offline-first, zero-friction privacy strategy |
| Mandatory accounts or sign-in | Adds onboarding friction and undermines the local-only positioning |
| Bluetooth cuff integrations | Hardware breadth would dominate v1 complexity without validating the core product loop |
| Health Connect integration in v1 | Valuable later, but not required to validate the first release |
| Medication tracking, weight tracking, or broader health dashboards | Dilutes the single-purpose blood pressure product |
| AI diagnosis, treatment recommendations, or risk scoring | Exceeds the product's non-diagnostic medical boundary |
| CSV export | PDF covers the primary appointment-sharing use case for v1 |
| Social features or gamification | Wrong fit for the calm, private utility positioning |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CORE-01 | Phase 1 | Pending |
| CORE-02 | Phase 1 | Pending |
| CORE-03 | Phase 1 | Pending |
| LOG-01 | Phase 2 | Pending |
| LOG-02 | Phase 2 | Pending |
| LOG-03 | Phase 2 | Pending |
| LOG-04 | Phase 2 | Pending |
| HIST-01 | Phase 3 | Pending |
| HIST-02 | Phase 3 | Pending |
| HIST-03 | Phase 3 | Pending |
| HIST-04 | Phase 2 | Pending |
| INTP-01 | Phase 2 | Pending |
| INTP-02 | Phase 2 | Pending |
| INTP-03 | Phase 2 | Pending |
| TRND-01 | Phase 3 | Pending |
| TRND-02 | Phase 3 | Pending |
| TRND-03 | Phase 3 | Pending |
| EXPT-01 | Phase 4 | Pending |
| EXPT-02 | Phase 4 | Pending |
| EXPT-03 | Phase 4 | Pending |
| PRIV-01 | Phase 5 | Pending |
| PRIV-02 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 22 total
- Mapped to phases: 22
- Unmapped: 0

---
*Requirements defined: 2026-04-05*
*Last updated: 2026-04-05 after initialization*
