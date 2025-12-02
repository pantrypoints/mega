ALTER TABLE `user` RENAME COLUMN "location" TO "city";--> statement-breakpoint
ALTER TABLE `user` ADD `country` text;