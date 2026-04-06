/**
 * Bundled migration SQL for Expo Metro (avoids importing .sql — Metro parses them as JS and fails).
 * After `npm run db:generate`, copy the new SQL from drizzle/*.sql into a matching *.inline.ts
 * and update drizzle/migrations.ts imports.
 */
export default `CREATE TABLE \`readings\` (
	\`id\` text PRIMARY KEY NOT NULL,
	\`systolic\` integer NOT NULL,
	\`diastolic\` integer NOT NULL,
	\`pulse\` integer,
	\`measured_at\` integer NOT NULL,
	\`created_at\` integer NOT NULL
);
`;
