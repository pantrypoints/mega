ALTER TABLE `sessions` RENAME TO `session`;--> statement-breakpoint
ALTER TABLE `users` RENAME TO `user`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_session`("id", "user_id", "expires_at") SELECT "id", "user_id", "expires_at" FROM `session`;--> statement-breakpoint
DROP TABLE `session`;--> statement-breakpoint
ALTER TABLE `__new_session` RENAME TO `session`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
DROP INDEX `users_codename_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `user_codename_unique` ON `user` (`codename`);--> statement-breakpoint
CREATE TABLE `__new_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content` text NOT NULL,
	`user_id` integer NOT NULL,
	`date_created` text DEFAULT (CURRENT_TIMESTAMP),
	`date_modified` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_posts`("id", "content", "user_id", "date_created", "date_modified") SELECT "id", "content", "user_id", "date_created", "date_modified" FROM `posts`;--> statement-breakpoint
DROP TABLE `posts`;--> statement-breakpoint
ALTER TABLE `__new_posts` RENAME TO `posts`;--> statement-breakpoint
CREATE TABLE `__new_products` (
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
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_products`("id", "name", "measure", "points", "category", "photo1", "photo2", "photo3", "photo4", "photo5", "photo6", "description", "headline", "user_id", "date_created", "date_modified") SELECT "id", "name", "measure", "points", "category", "photo1", "photo2", "photo3", "photo4", "photo5", "photo6", "description", "headline", "user_id", "date_created", "date_modified" FROM `products`;--> statement-breakpoint
DROP TABLE `products`;--> statement-breakpoint
ALTER TABLE `__new_products` RENAME TO `products`;--> statement-breakpoint
CREATE TABLE `__new_services` (
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
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_services`("id", "name", "measure", "points", "category", "photo1", "photo2", "photo3", "photo4", "photo5", "photo6", "description", "headline", "user_id", "date_created", "date_modified") SELECT "id", "name", "measure", "points", "category", "photo1", "photo2", "photo3", "photo4", "photo5", "photo6", "description", "headline", "user_id", "date_created", "date_modified" FROM `services`;--> statement-breakpoint
DROP TABLE `services`;--> statement-breakpoint
ALTER TABLE `__new_services` RENAME TO `services`;--> statement-breakpoint
CREATE TABLE `__new_transactions` (
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
	FOREIGN KEY (`giver_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`getter_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`transferee_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_transactions`("id", "name", "points", "measure", "amount", "photo", "notes", "kind", "category", "status", "giver_id", "getter_id", "transferee_id", "date_accepted", "date_cancelled", "date_transferred", "date_created", "date_modified") SELECT "id", "name", "points", "measure", "amount", "photo", "notes", "kind", "category", "status", "giver_id", "getter_id", "transferee_id", "date_accepted", "date_cancelled", "date_transferred", "date_created", "date_modified" FROM `transactions`;--> statement-breakpoint
DROP TABLE `transactions`;--> statement-breakpoint
ALTER TABLE `__new_transactions` RENAME TO `transactions`;