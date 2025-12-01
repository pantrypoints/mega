DROP INDEX "user_codename_unique";--> statement-breakpoint
ALTER TABLE `user` ALTER COLUMN "gender" TO "gender" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `user_codename_unique` ON `user` (`codename`);