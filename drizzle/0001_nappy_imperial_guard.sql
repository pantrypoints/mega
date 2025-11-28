ALTER TABLE `session` RENAME TO `sessions`;--> statement-breakpoint
ALTER TABLE `user` RENAME TO `users`;--> statement-breakpoint
CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content` text NOT NULL,
	`user_id` integer NOT NULL,
	`date_created` text DEFAULT (CURRENT_TIMESTAMP),
	`date_modified` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`measure` text NOT NULL,
	`points` real NOT NULL,
	`category` text NOT NULL,
	`photo1` text,
	`photo2` text,
	`photo3` text,
	`photo4` text,
	`photo5` text,
	`photo6` text,
	`description` text,
	`headline` text,
	`user_id` integer NOT NULL,
	`date_created` text DEFAULT (CURRENT_TIMESTAMP),
	`date_modified` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`measure` text NOT NULL,
	`points` real NOT NULL,
	`category` text NOT NULL,
	`photo1` text,
	`photo2` text,
	`photo3` text,
	`photo4` text,
	`photo5` text,
	`photo6` text,
	`description` text,
	`headline` text,
	`user_id` integer NOT NULL,
	`date_created` text DEFAULT (CURRENT_TIMESTAMP),
	`date_modified` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`points` real NOT NULL,
	`measure` text,
	`amount` real,
	`photo` text,
	`notes` text,
	`kind` text NOT NULL,
	`category` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`giver_id` integer NOT NULL,
	`getter_id` integer NOT NULL,
	`transferee_id` integer,
	`date_accepted` text,
	`date_cancelled` text,
	`date_transferred` text,
	`date_created` text DEFAULT (CURRENT_TIMESTAMP),
	`date_modified` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`giver_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`getter_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`transferee_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_sessions`("id", "user_id", "expires_at") SELECT "id", "user_id", "expires_at" FROM `sessions`;--> statement-breakpoint
DROP TABLE `sessions`;--> statement-breakpoint
ALTER TABLE `__new_sessions` RENAME TO `sessions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
DROP INDEX `user_username_unique`;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`codename` text NOT NULL,
	`pin` text NOT NULL,
	`password_hash` text NOT NULL,
	`avatar` text,
	`gender` text,
	`date_of_birth` text,
	`email` text,
	`phone` text,
	`location` text,
	`heart` real DEFAULT 0,
	`brain` real DEFAULT 0,
	`body` real DEFAULT 0,
	`luna` real DEFAULT 0,
	`mercury` real DEFAULT 0,
	`saturn` real DEFAULT 0,
	`apollo` real DEFAULT 0,
	`jupiter` real DEFAULT 0,
	`venus` real DEFAULT 0,
	`mars` real DEFAULT 0,
	`date_created` text DEFAULT (CURRENT_TIMESTAMP),
	`date_modified` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "username", "codename", "pin", "password_hash", "avatar", "gender", "date_of_birth", "email", "phone", "location", "heart", "brain", "body", "luna", "mercury", "saturn", "apollo", "jupiter", "venus", "mars", "date_created", "date_modified") SELECT "id", "username", "codename", "pin", "password_hash", "avatar", "gender", "date_of_birth", "email", "phone", "location", "heart", "brain", "body", "luna", "mercury", "saturn", "apollo", "jupiter", "venus", "mars", "date_created", "date_modified" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
CREATE UNIQUE INDEX `users_codename_unique` ON `users` (`codename`);