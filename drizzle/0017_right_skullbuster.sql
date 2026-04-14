ALTER TABLE `user` ADD `rel` text DEFAULT 'off' NOT NULL;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `view`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `country`;