<!-- GSD:project-start source:PROJECT.md -->
## Project

**Blood Pressure Tracker**

Blood Pressure Tracker is an Android app built with React Native for people who want a calm, private, low-friction way to log and understand their blood pressure readings. It is designed as a minimalist, design-first utility inspired by Apple Health, with the interface getting out of the way so users can record a reading, see immediate context, and review trends without noise or account friction.

**Core Value:** Logging and understanding a blood pressure reading should feel instant, private, and visually clear.

### Constraints

- **Platform**: Android only — Apple Health already occupies the iOS reference space, so the release target is Google Play.
- **Tech stack**: React Native — implementation must suit a production-quality Android app in this ecosystem.
- **Privacy**: Fully offline and local-first — no backend, account system, or cloud sync in v1.
- **Scope**: Single-purpose product — avoid adjacent health features that dilute the core blood pressure use case.
- **UX bar**: High-fidelity, minimalist polish — design quality is a core differentiator, not a nice-to-have.
- **Medical boundary**: WHO-based status guidance only — the app must clearly avoid implying medical advice or diagnosis.
- **Export**: PDF only — enough for doctor visits without expanding scope into broader data portability formats.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack
- **Expo framework**
- **Expo Router**
- **React Native New Architecture + Hermes**
- **SQLite for local persistence**
- **EAS Build for Android release builds**
- Offline-first
- Local-only/private
- Android-only for v1
- Small in data volume but sensitive in correctness
- Design-led, where animation and chart polish matter more than backend complexity
## Stack Decision Table
| Layer | Recommendation | Why | Confidence |
|------|----------------|-----|------------|
| App framework | **Expo SDK 54/55-era project, started with `create-expo-app`** | Standard 2025 RN path for new apps; fastest route to native modules, Android shipping, and maintainable upgrades | HIGH |
| Native workflow | **Expo development builds + CNG (Prebuild)** | Production apps need native libraries and config plugins; CNG keeps native config reproducible without living in raw Android project files | HIGH |
| React Native runtime | **New Architecture + Hermes** | This is the mainstream direction of RN; better long-term compatibility and performance | HIGH |
| Navigation | **Expo Router** | File-based routing on top of React Navigation; lower setup cost and better default project structure for greenfield apps | HIGH |
| Local database | **`expo-sqlite`** | Correct storage model for structured health logs, filters, trends, and export queries; survives restarts and supports migrations | HIGH |
| DB access layer | **Drizzle ORM with Expo SQLite driver** | Typed schema, migrations, and live queries without introducing a server-oriented data layer | MEDIUM |
| Secrets / app lock state | **`expo-secure-store`** | Good fit for storing small sensitive settings like app-lock flags, not bulk health records | HIGH |
| Biometrics | **`expo-local-authentication`** | Clean Android biometric prompt for optional privacy lock in later phases | HIGH |
| Charts | **`victory-native` (Victory Native XL) + `@shopify/react-native-skia` + `react-native-reanimated`** | Best fit for smooth, high-fidelity trend charts on RN; Skia-backed rendering is materially better for a design-first tracker than older SVG-first chart stacks | MEDIUM |
| Date/time input | **`@react-native-community/datetimepicker`** | Native system date/time selection is the right default for quick manual logging | HIGH |
| PDF export | **`expo-print` + `expo-sharing` + `expo-file-system`** | Generate a PDF from a controlled HTML template, then save/share it through Android-native flows | HIGH |
| Validation | **Zod** | Reliable schema validation for reading entry, export filters, and migration guards; works cleanly with TypeScript | MEDIUM |
| State management | **No heavy global store initially; keep server-state libraries out.** Use local component state and DB-driven selectors. Add Zustand only if UI state becomes cross-screen. | There is no backend and the main state is already in SQLite. Extra state infrastructure is usually waste here | MEDIUM |
| Testing | **React Native Testing Library + Maestro** | RNTL for logic/UI behavior; Maestro for real Android flows like add-reading, edit, and PDF export smoke tests | MEDIUM |
## Prescriptive Package Set
### Core Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Expo | SDK 55 if starting now; SDK 54/55 assumptions are valid for 2025-style roadmap work | App framework and native modules | Expo is now the standard starting point for greenfield RN apps unless a custom native SDK forces bare workflow |
| React Native | Bundled with Expo SDK | Core runtime | Expo tracks stable RN releases and reduces upgrade friction |
| TypeScript | Strict mode | Type safety | Health data entry and interpretation logic should not tolerate loose typing |
### Database
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `expo-sqlite` | Bundled with current Expo SDK | Local structured storage | Better than key-value storage for readings, derived queries, trends, and export |
| Drizzle ORM | Latest stable | Typed queries and migrations | Best fit if you want schema discipline without backend-oriented complexity |
### Infrastructure
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Expo development builds | Current | Real-device development | Required once you depend on native modules outside Expo Go limits |
| EAS Build | Current | Android release builds | Standard Expo path for signing and shipping Android binaries |
| EAS Update | Optional later | OTA JS updates | Useful for small non-native fixes, but not required for v1 |
### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `expo-router` | Bundled with Expo template | Navigation | Use from day one; it is the cleanest greenfield structure |
| `expo-secure-store` | Bundled | Small encrypted key-value storage | Use only for secrets/settings, never for reading history |
| `expo-local-authentication` | Bundled | Optional biometric app lock | Add when privacy lock becomes a requirement |
| `expo-print` | Bundled | PDF generation | Use for doctor-friendly export from HTML template |
| `expo-sharing` | Bundled | Android share sheet | Use to hand off the generated PDF |
| `expo-file-system` | Bundled | Local file access for exported PDFs | Use alongside export/share flows |
| `@react-native-community/datetimepicker` | Bundled via Expo third-party integration | Native date/time selection | Use for fast entry with current date/time defaults |
| `react-native-reanimated` | 4.x line in current docs | Motion and chart interaction | Use for intentional motion, transitions, and interactive charts |
| `@shopify/react-native-skia` | Latest stable | High-performance graphics | Use for trend visuals and any custom medical-style data viz |
| `victory-native` | Latest stable | Chart primitives | Use to build polished line/area/bar chart experiences over Skia |
| `zod` | 4.x | Validation | Use at DB boundaries, form parsing, and export filters |
| `date-fns` | 4.x | Date formatting and range grouping | Use for local date utilities without pulling in a heavy time library |
| `zustand` | Optional | Small cross-screen UI state | Only add if filters, preferences, and dashboard state stop fitting local state cleanly |
| `@testing-library/react-native` | 13.x/14.x line | Integration-style component testing | Use for entry form, trend cards, and interpretation rendering |
| `maestro` | Current | Android E2E flow automation | Use for smoke tests on real devices/emulators |
## Recommended Project Shape
- **SQLite owns persisted truth**
- **Feature modules own domain logic**
- **UI primitives own the visual system**
- **Charts are a first-class component area, not an afterthought**
## What To Use
### 1. Start with Expo, not bare React Native
- `npx create-expo-app@latest --template default@sdk-55`
- Expo Router
- development builds
- CNG / Prebuild
- Expo’s default template already includes the modern routing path.
- Development builds are the production-grade path once you use native libraries.
- CNG reduces native project drift, which matters in a greenfield app that should stay easy to upgrade.
### 2. Put all readings in SQLite
- systolic
- diastolic
- pulse (optional field if supported)
- measured_at
- note-free v1 metadata if needed
- created_at / updated_at
- Trend queries, date grouping, recent-history pagination, and export generation are relational problems.
- `AsyncStorage` is the wrong abstraction for structured medical logs.
- SQLite migrations are straightforward and durable for future fields.
### 3. Use typed schema and migrations from day one
- Drizzle schema definitions
- generated SQL migrations bundled in app
- Even a “simple tracker” grows schema quickly once you add edit history, soft deletion, export metadata, or optional fields.
- Local-only apps still need disciplined migrations. Reinstalling to fix schema mistakes is not acceptable for health data.
### 4. Keep the UI layer custom
- custom spacing, color, typography, and card primitives
- Reanimated for motion
- Skia/Victory for charts
- The differentiator here is calm, premium clarity.
- Heavy mobile UI kits push the product toward generic Material visuals.
- This app needs a restrained health-dashboard aesthetic, not an enterprise CRUD look.
### 5. Use HTML-to-PDF through Expo Print
- a tightly controlled HTML/CSS template
- `expo-print` to generate the PDF
- `expo-file-system` for file handling
- `expo-sharing` to export it
- Doctor export is basically a formatted document problem.
- HTML templating is much easier to iterate on than trying to compose PDF layouts through lower-level drawing APIs.
## What NOT To Use
| Category | Avoid | Why Not |
|----------|-------|---------|
| App bootstrap | Bare React Native CLI as the default choice | Slower setup, more native maintenance, worse fit for this scope unless a later native SDK forces it |
| Persistence | `AsyncStorage` as primary data store | Key-value storage is a bad fit for structured reading history and trend queries |
| Persistence | Realm / WatermelonDB | Overkill for a single-user offline tracker without sync or very large datasets |
| State | Redux Toolkit for v1 | Too much ceremony for an app whose truth already lives in SQLite |
| State | TanStack Query / SWR as a core dependency | No server-state problem exists in v1 |
| UI | React Native Paper or another heavy component kit | Fast to scaffold, but it will fight the “Apple Health-inspired” visual goal |
| Charts | Old SVG-only chart stacks as the primary trend solution | Good enough for admin-style dashboards, not ideal for polished, animated medical trend surfaces |
| Export | WebView-based report screens as the product’s main rendering path | Fine for controlled HTML-to-PDF generation, poor as a general UI strategy |
## Installation
# Core
# Optional if cross-screen UI state grows
# Dev dependencies
# E2E
## Final Recommendation
- **Expo SDK 55**
- **Expo Router**
- **React Native New Architecture + Hermes**
- **`expo-sqlite` + Drizzle**
- **custom design system with RN primitives**
- **Reanimated + Skia + Victory Native for charts**
- **`expo-print` / `expo-sharing` / `expo-file-system` for PDF export**
## Confidence Notes
| Recommendation | Confidence | Notes |
|---------------|------------|-------|
| Expo + CNG + development builds | HIGH | Directly supported and recommended by Expo docs for real production apps |
| Expo Router for greenfield navigation | HIGH | Expo explicitly recommends it for new apps |
| New Architecture + Hermes | HIGH | Official RN direction; legacy architecture is no longer where new work should start |
| SQLite as primary store | HIGH | Strong technical fit and officially supported in Expo |
| Drizzle over raw SQL helpers | MEDIUM | Official Drizzle support exists for Expo SQLite; still an ecosystem-layer recommendation rather than a platform default |
| Skia/Victory chart stack | MEDIUM | Strong fit and actively maintained, but chart-library choice remains more ecosystem-driven than platform-prescribed |
| Avoiding heavy state libraries in v1 | MEDIUM | Architectural recommendation based on scope, not a platform rule |
## Sources
- Expo create-expo-app: https://docs.expo.dev/get-started/create-a-project/
- Expo Router introduction: https://docs.expo.dev/router/introduction/
- Expo development builds: https://docs.expo.dev/develop/development-builds/introduction/
- Expo Continuous Native Generation: https://docs.expo.dev/workflow/continuous-native-generation/
- Expo SDK version matrix: https://docs.expo.dev/versions/latest/
- Expo SQLite: https://docs.expo.dev/versions/latest/sdk/sqlite/
- Expo Print: https://docs.expo.dev/versions/latest/sdk/print/
- Expo Sharing: https://docs.expo.dev/versions/latest/sdk/sharing/
- Expo FileSystem: https://docs.expo.dev/versions/v55.0.0/sdk/filesystem/
- Expo SecureStore: https://docs.expo.dev/versions/latest/sdk/securestore/
- Expo LocalAuthentication: https://docs.expo.dev/versions/latest/sdk/local-authentication/
- Expo support page for DateTimePicker: https://docs.expo.dev/versions/latest/sdk/date-time-picker/
- React Navigation native stack: https://reactnavigation.org/docs/native-stack-navigator/
- React Native Hermes: https://reactnative.dev/docs/hermes
- React Native release notes on New Architecture direction: https://reactnative.dev/blog/2025/06/12/react-native-0.80
- Drizzle Expo SQLite driver: https://orm.drizzle.team/docs/connect-expo-sqlite
- React Native Reanimated docs: https://docs.swmansion.com/react-native-reanimated/
- React Native Skia docs: https://shopify.github.io/react-native-skia/
- Victory Native XL repository/docs entry: https://github.com/FormidableLabs/victory-native-xl
- Zod docs: https://zod.dev/
- React Native Testing Library: https://callstack.github.io/react-native-testing-library/
- Maestro docs: https://docs.maestro.dev/
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
