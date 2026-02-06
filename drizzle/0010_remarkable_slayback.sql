CREATE TABLE `requests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`measure` text NOT NULL,
	`points` real NOT NULL,
	`category` text NOT NULL,
	`photo1` text,
	`photo2` text,
	`photo3` text,
	`description` text,
	`headline` text,
	`user_id` text NOT NULL,
	`date_created` text DEFAULT (CURRENT_TIMESTAMP),
	`date_modified` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tracker` (
	`log_id` text PRIMARY KEY NOT NULL,
	`email_id` text,
	`title` text,
	`country` text,
	`device` text,
	`date_created` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `wishes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`measure` text NOT NULL,
	`points` real NOT NULL,
	`category` text NOT NULL,
	`photo1` text,
	`photo2` text,
	`photo3` text,
	`description` text,
	`headline` text,
	`user_id` text NOT NULL,
	`date_created` text DEFAULT (CURRENT_TIMESTAMP),
	`date_modified` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `photo4`;--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `photo5`;--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `photo6`;--> statement-breakpoint
ALTER TABLE `services` DROP COLUMN `photo4`;--> statement-breakpoint
ALTER TABLE `services` DROP COLUMN `photo5`;--> statement-breakpoint
ALTER TABLE `services` DROP COLUMN `photo6`;