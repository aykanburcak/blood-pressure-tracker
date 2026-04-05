# Technology Stack

**Project:** Blood Pressure Tracker
**Researched:** 2026-04-05
**Scope:** Offline-first Android blood pressure tracker, React Native, greenfield

## Recommended Stack

This should be an **Expo-managed React Native app with Continuous Native Generation**, using **SQLite as the single source of truth**, **custom design primitives instead of a heavy UI kit**, and **Skia-based chart rendering** for the trend/history surfaces.

For a greenfield app in this category, the standard 2025 choice is not “bare React Native + many native patches.” It is:

- **Expo framework**
- **Expo Router**
- **React Native New Architecture + Hermes**
- **SQLite for local persistence**
- **EAS Build for Android release builds**

That stack is the best fit because the product is:

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

Use this as the default project layout:

```text
app/
  (tabs)/
    index.tsx          # dashboard
    history.tsx
    settings.tsx
  add-reading.tsx
  reading/[id].tsx
src/
  db/
    schema.ts
    client.ts
    migrations/
  features/
    readings/
    trends/
    export/
    interpretation/
  components/
    primitives/
    charts/
  lib/
    time/
    validation/
    pdf/
  theme/
```

The important boundary is:

- **SQLite owns persisted truth**
- **Feature modules own domain logic**
- **UI primitives own the visual system**
- **Charts are a first-class component area, not an afterthought**

## What To Use

### 1. Start with Expo, not bare React Native

Use:

- `npx create-expo-app@latest --template default@sdk-55`
- Expo Router
- development builds
- CNG / Prebuild

Why:

- Expo’s default template already includes the modern routing path.
- Development builds are the production-grade path once you use native libraries.
- CNG reduces native project drift, which matters in a greenfield app that should stay easy to upgrade.

### 2. Put all readings in SQLite

Use SQLite tables for:

- systolic
- diastolic
- pulse (optional field if supported)
- measured_at
- note-free v1 metadata if needed
- created_at / updated_at

Why:

- Trend queries, date grouping, recent-history pagination, and export generation are relational problems.
- `AsyncStorage` is the wrong abstraction for structured medical logs.
- SQLite migrations are straightforward and durable for future fields.

### 3. Use typed schema and migrations from day one

Use:

- Drizzle schema definitions
- generated SQL migrations bundled in app

Why:

- Even a “simple tracker” grows schema quickly once you add edit history, soft deletion, export metadata, or optional fields.
- Local-only apps still need disciplined migrations. Reinstalling to fix schema mistakes is not acceptable for health data.

### 4. Keep the UI layer custom

Use:

- custom spacing, color, typography, and card primitives
- Reanimated for motion
- Skia/Victory for charts

Why:

- The differentiator here is calm, premium clarity.
- Heavy mobile UI kits push the product toward generic Material visuals.
- This app needs a restrained health-dashboard aesthetic, not an enterprise CRUD look.

### 5. Use HTML-to-PDF through Expo Print

Use:

- a tightly controlled HTML/CSS template
- `expo-print` to generate the PDF
- `expo-file-system` for file handling
- `expo-sharing` to export it

Why:

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

```bash
# Core
npx create-expo-app@latest blood-pressure-tracker --template default@sdk-55

cd blood-pressure-tracker

npx expo install expo-router expo-sqlite expo-secure-store expo-local-authentication
npx expo install expo-print expo-sharing expo-file-system
npx expo install @react-native-community/datetimepicker
npx expo install react-native-reanimated @shopify/react-native-skia

npm install drizzle-orm zod date-fns victory-native

# Optional if cross-screen UI state grows
npm install zustand

# Dev dependencies
npm install -D drizzle-kit babel-plugin-inline-import
npm install -D @testing-library/react-native jest-expo
# E2E
npm install -D @maestro-ai/maestro
```

## Final Recommendation

If this were my build, I would ship v1 on:

- **Expo SDK 55**
- **Expo Router**
- **React Native New Architecture + Hermes**
- **`expo-sqlite` + Drizzle**
- **custom design system with RN primitives**
- **Reanimated + Skia + Victory Native for charts**
- **`expo-print` / `expo-sharing` / `expo-file-system` for PDF export**

I would explicitly **not** start with Redux, React Query, Realm, WatermelonDB, or a heavy UI kit.

That combination is the right balance for this product: it is current, standard, low-risk to ship, and optimized for the real hard parts of the app: local data correctness, chart polish, and a premium offline UX.

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

Primary / official sources used:

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
