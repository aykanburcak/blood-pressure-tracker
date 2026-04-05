# Architecture Patterns

**Domain:** Offline-first Android blood pressure tracker
**Researched:** 2026-04-05
**Confidence:** HIGH for local-first structure and Android privacy boundaries; MEDIUM for library-level implementation details that depend on final stack choice

## Recommended Architecture

An offline-first blood pressure tracker should be built around a **single local database as the source of truth**. For this app, that means:

`UI -> use case/service -> repository -> SQLite`

Everything user-facing should read from the local database, not from in-memory state. The UI can keep temporary form state, modal state, and filters, but persisted health data should live in SQLite immediately and be re-read from there. That is the normal structure for offline-first health utilities because it keeps logging, charting, export, and future sync all consistent around one canonical record set.

For this React Native app, the cleanest greenfield structure is:

1. **App shell and bootstrap**
2. **Local persistence layer**
3. **Domain/use-case layer**
4. **Feature presentation layer**
5. **Platform adapters for Android file/share/privacy concerns**

Because v1 is explicitly local-only, do **not** introduce a backend abstraction, sync queue, or network cache at the center of the app. Leave a seam for future sync, but do not architect the first version as if a server already exists.

### High-Level Shape

```text
App Bootstrap
  -> run migrations
  -> load preferences
  -> register error boundaries
  -> start navigation

Screens / Components
  -> call feature hooks or view models
  -> invoke use cases

Use Cases / Domain Services
  -> validate readings
  -> classify reading
  -> compute chart ranges / summaries
  -> prepare export snapshots

Repositories
  -> CRUD + query local database
  -> map rows <-> domain models

SQLite Database
  -> readings
  -> preferences
  -> schema metadata / migrations

Android Integrations
  -> file generation
  -> share sheet
  -> backup/privacy rules
```

## Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| App Bootstrap | Opens database, applies migrations, loads theme/preferences, mounts providers, starts navigation | Database, preferences store, navigation |
| Navigation Shell | Defines screen graph and app flow | Feature screens only |
| Reading Capture Feature | Fast manual entry, current date/time defaults, save action, inline validation | Reading use cases |
| History Feature | List of readings, filtering, simple editing/deleting if included | Query use cases |
| Trends Feature | Chart-ready data, trend summaries, date-range selection | Analytics/query use cases |
| Export Feature | Produces a stable export snapshot and turns it into a shareable PDF | Export service, file adapter, share adapter |
| Preferences/Privacy Feature | Local-only messaging, units/format, appearance, optional backup/privacy controls | Preferences repository, platform settings |
| Domain Models | `BloodPressureReading`, `ReadingClassification`, `TrendPoint`, `ExportSnapshot`, `AppPreferences` | Repositories and use cases |
| Validation + Classification Services | Validate ranges and classify readings from one canonical rules engine | Reading use cases, export service |
| Trend/Aggregation Services | Convert raw readings into chart series and summary cards | Query repositories, UI view models |
| Repositories | Hide SQL details and expose app-level operations such as `saveReading`, `listReadings`, `getTrendRange` | SQLite adapter |
| SQLite Adapter | Database connection, migrations, transactions, statement lifecycle | Expo SQLite / chosen DB wrapper |
| File Adapter | Writes PDF output into app-private storage/cache | Export service, Android file APIs |
| Share Adapter | Shares the generated PDF to other apps | Export feature, Android sharing |
| Error/Observability Boundary | Local logging, crash-safe fallbacks, export failure handling | All upper layers |

## Suggested Module Layout

```text
src/
  app/
    bootstrap/
    navigation/
    providers/
  features/
    readings/
      components/
      screens/
      hooks/
      useCases/
    history/
    trends/
    export/
    settings/
  domain/
    models/
    services/
    rules/
  data/
    db/
      schema/
      migrations/
      client/
    repositories/
    mappers/
  platform/
    files/
    sharing/
    backup/
  design/
    theme/
    tokens/
```

This keeps the architecture **feature-first above the data layer**. Screens live by feature. SQL and file integrations live below them. Domain rules sit in the middle and are shared by charting and export.

## Data Flow

### Core Logging Flow

```text
User enters reading
-> local form state updates
-> Save action calls SaveReading use case
-> validation service checks numeric and domain constraints
-> classification service computes WHO-style status
-> repository writes transaction to SQLite
-> query invalidation / re-fetch runs
-> dashboard, history, and trends re-read from SQLite
-> UI updates from persisted data
```

The important architectural rule is: **the success state comes from the database commit, not from optimistic in-memory mutation**. For a local-only app, writes are fast enough that this keeps behavior simpler and safer.

### Dashboard / History / Trends Flow

```text
Screen opens
-> query hook asks use case for data
-> use case fetches rows through repository
-> aggregation service derives summary cards / chart points
-> presentation mapper converts domain output to view-ready props
-> UI renders
```

Raw readings should stay raw in storage. Trend points, chart buckets, and summary copy should be derived on read. Do not materialize aggregates into separate tables in v1 unless performance proves it necessary.

### Export Flow

```text
User taps Export PDF
-> export use case requests a stable reading snapshot from repository
-> classification / summary services produce doctor-facing context
-> export formatter builds HTML/template payload
-> print/PDF adapter renders PDF
-> file adapter stores PDF in app storage
-> share adapter exposes file to Android share targets
```

The export boundary matters: the PDF feature should not query UI state directly. It should consume the same domain objects used elsewhere so the on-screen interpretation and exported interpretation cannot drift.

### App Startup / Resume Flow

```text
App launch
-> bootstrap opens DB
-> migrations run
-> preferences load
-> app shell mounts
-> initial dashboard queries local DB

App background/foreground
-> AppState listener flushes any pending UI state if needed
-> screens re-query only if their dependencies changed
```

## Recommended Persistence Model

For this domain, a small relational model is the right starting point.

### Core Tables

| Table | Purpose | Notes |
|-------|---------|-------|
| `readings` | Canonical blood pressure entries | Central table; every feature depends on it |
| `preferences` | Theme, date/time format, onboarding/privacy acknowledgement | Small key-value or typed table |
| `schema_migrations` | Applied migration tracking | Required from day one |

### `readings` Row Shape

At minimum, persist:

- `id`
- `measured_at`
- `systolic`
- `diastolic`
- `pulse` nullable
- `source` default `manual`
- `created_at`
- `updated_at`

Optional but architecture-safe if added later:

- `arm`
- `body_position`
- `cuff_size`
- `deleted_at` for soft delete

Do not store duplicate presentation-only values such as chart labels or preformatted strings. If you persist classification, treat it as a cached derivative with a migration path; otherwise derive it from current rules.

## Patterns to Follow

### Pattern 1: Local Database as Source of Truth
**What:** Persist all health records to SQLite first and render from queries.
**When:** Always for readings, history, trends, and export.
**Why:** Offline-first apps become brittle when screens own their own copies of persisted data.

### Pattern 2: Shared Domain Rules Engine
**What:** One reusable service for validation and WHO-style classification.
**When:** On save, edit, chart summaries, and PDF export.
**Why:** Prevents the form screen, dashboard cards, and PDF export from classifying the same reading differently.

### Pattern 3: Feature Modules Over Global Store
**What:** Keep business logic inside feature/use-case modules; use global state only for small UI concerns.
**When:** Throughout the app.
**Why:** This app has no backend session, multi-user complexity, or collaborative state. A large Redux-style center adds indirection without solving a real problem.

### Pattern 4: Platform Adapters at the Edge
**What:** Keep file generation, Android share intents, and backup/privacy configuration outside feature screens.
**When:** Export and privacy work.
**Why:** Android-specific concerns will change independently of reading logic.

### Pattern 5: Schema Migrations From Day One
**What:** Treat DB migrations as a first-class part of app startup.
**When:** Immediately.
**Why:** Health data is durable user data. Ad hoc schema changes cause the most painful rewrites in local-only apps.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Screens Querying SQLite Directly
**Why bad:** SQL spreads across the app, rules diverge, and export/chart features become hard to evolve.
**Instead:** Repositories plus use cases.

### Anti-Pattern 2: Using AsyncStorage or SecureStore for Readings
**Why bad:** AsyncStorage is unencrypted key-value storage; SecureStore is not meant to be the single source of truth for critical datasets.
**Instead:** Store readings in SQLite. Use SecureStore only for small secrets if one ever appears.

### Anti-Pattern 3: Treating Charts as the Primary Model
**Why bad:** Buckets and trend series are derived views, not source data.
**Instead:** Keep raw readings canonical and derive visual series on read.

### Anti-Pattern 4: Persisting Full Navigation State in Production v1
**Why bad:** React Navigation warns persisted state must be serializable and can leave users stuck on crashing screens if not handled carefully.
**Instead:** Persist only lightweight preferences and maybe simple filters. Add production nav persistence only with explicit recovery logic.

### Anti-Pattern 5: Building for Cloud Sync Before Local UX Is Stable
**Why bad:** You end up designing conflict resolution and server models before the core logging loop is proven.
**Instead:** Keep a clean repository seam so sync can be added later beside the local store.

## Integration Boundaries

These are the seams that should stay explicit in the codebase:

| Boundary | Owns | Must Not Own |
|----------|------|--------------|
| UI / Feature Boundary | Rendering, input controls, transient state | SQL, PDF generation, classification rules |
| Domain Boundary | Validation, classification, summaries, export snapshot shaping | React components, native API calls |
| Repository Boundary | Persistence operations and query contracts | UI formatting |
| Database Boundary | SQL, migrations, transactions | Business terminology beyond schema mapping |
| Platform Boundary | Android file URIs, share intents, backup config | Reading rules or UI decisions |

This separation is what keeps the app easy to ship now and easy to extend later.

## Build-Order Implications

The roadmap should follow the dependency chain of the architecture.

### Phase 1: Foundation
Build:
- Expo/React Native Android app shell
- database client
- schema + migrations
- providers, theme, navigation shell
- basic privacy/local-only framing

Why first:
- Every real feature depends on a stable local persistence boundary.
- Export and trends should not be started before the reading schema is stable.

### Phase 2: Core Logging Loop
Build:
- reading capture screen
- save/edit/delete use cases
- validation/classification service
- dashboard with latest reading and recent list

Why second:
- This is the core product loop and the source of truth for all later derived features.

### Phase 3: History and Trends
Build:
- history list
- date range filtering
- chart data selectors / aggregation services
- summary cards based on persisted data

Why third:
- Trends are a read model over the saved readings. They are downstream of Phase 2.

### Phase 4: PDF Export
Build:
- export snapshot builder
- PDF template / rendering pipeline
- file writing and Android sharing

Why fourth:
- Export should use stable domain and query contracts, not drive them.

### Phase 5: Hardening and Privacy Edges
Build:
- Android backup rules
- error states and recovery
- large dataset performance passes
- migration tests

Why last:
- These are critical, but they are easier to implement correctly after real data flow exists.

## Scalability Considerations

| Concern | At 100 users | At 10K users | At 1M users |
|---------|--------------|--------------|-------------|
| On-device data size | Simple raw query model is enough | Add indexes on `measured_at` and common filters | Consider archive/export pruning tools, still local-first |
| Chart performance | Derive on read | Optimize selectors and chart sampling | Precompute aggregates only if real profiling proves need |
| Schema evolution | Straightforward migrations | Migration testing becomes mandatory | Backward compatibility and corruption recovery become product-critical |
| Privacy expectations | Local-only positioning is a differentiator | Backup/export wording needs to be precise | Regulatory/compliance review likely expands if distribution grows |

## Opinionated Recommendation

For this app, structure it as a **feature-first React Native app over a SQLite core**:

- Use Expo for the greenfield React Native foundation and Android build workflow.
- Use SQLite as the canonical store for readings.
- Keep a thin repository layer and a reusable domain rules layer.
- Treat trends and PDF export as downstream read models over the same stored readings.
- Keep Android-specific file sharing and backup behavior behind adapters.

That is the normal, durable architecture for an offline-first health utility. It is simple enough for v1, but it preserves the right seams for future sync, reminders, or additional health measurements without forcing a rewrite.

## Sources

- React Native recommends using a framework like Expo for new apps: https://reactnative.dev/
- Expo create-project guidance and current SDK bootstrap: https://docs.expo.dev/get-started/create-a-project/
- Expo SQLite persistence and tooling: https://docs.expo.dev/versions/latest/sdk/sqlite/
- Expo SecureStore persistence caveats and Android backup behavior: https://docs.expo.dev/versions/latest/sdk/securestore/
- Expo Print PDF support: https://docs.expo.dev/versions/latest/sdk/print/
- Expo FileSystem local file and Android content URI handling: https://docs.expo.dev/versions/latest/sdk/filesystem-legacy/
- Expo New Architecture guidance: https://docs.expo.dev/guides/new-architecture/
- React Navigation state persistence cautions: https://reactnavigation.org/docs/state-persistence/
- Android backup security recommendations: https://developer.android.com/privacy-and-security/risks/backup-best-practices
- Android storage guidance for sensitive data: https://developer.android.com/training/data-storage/
- Drizzle Expo SQLite integration reference, if a typed ORM/migration workflow is chosen: https://orm.drizzle.team/docs/get-started/expo-new
