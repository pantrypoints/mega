DROP INDEX "user_codename_unique";--> statement-breakpoint
ALTER TABLE `transactions` ALTER COLUMN "status" TO "status" text NOT NULL DEFAULT 'accepted';--> statement-breakpoint
CREATE UNIQUE INDEX `user_codename_unique` ON `user` (`codename`);