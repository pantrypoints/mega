DROP INDEX `user_codename_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);