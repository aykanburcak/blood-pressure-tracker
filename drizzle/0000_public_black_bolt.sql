CREATE TABLE `readings` (
	`id` text PRIMARY KEY NOT NULL,
	`systolic` integer NOT NULL,
	`diastolic` integer NOT NULL,
	`pulse` integer,
	`measured_at` integer NOT NULL,
	`created_at` integer NOT NULL
);
