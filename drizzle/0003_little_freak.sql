PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content` text NOT NULL,
	`user_id` text NOT NULL,
	`date_created` text DEFAULT (CURRENT_TIMESTAMP),
	`date_modified` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_posts`("id", "content", "user_id", "date_created", "date_modified") SELECT "id", "content", "user_id", "date_created", "date_modified" FROM `posts`;--> statement-breakpoint
DROP TABLE `posts`;--> statement-breakpoint
ALTER TABLE `__new_posts` RENAME TO `posts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
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
	`user_id` text NOT NULL,
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
	`user_id` text NOT NULL,
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
	`giver_id` text NOT NULL,
	`getter_id` text NOT NULL,
	`transferee_id` text,
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
ALTER TABLE `__new_transactions` RENAME TO `transactions`;--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` text PRIMARY KEY NOT NULL,
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
	`heart` real,
	`brain` real,
	`body` real,
	`luna` real,
	`mercury` real,
	`saturn` real,
	`apollo` real,
	`jupiter` real,
	`venus` real,
	`mars` real,
	`date_created` text DEFAULT (CURRENT_TIMESTAMP),
	`date_modified` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "username", "codename", "pin", "password_hash", "avatar", "gender", "date_of_birth", "email", "phone", "location", "heart", "brain", "body", "luna", "mercury", "saturn", "apollo", "jupiter", "venus", "mars", "date_created", "date_modified") SELECT "id", "username", "codename", "pin", "password_hash", "avatar", "gender", "date_of_birth", "email", "phone", "location", "heart", "brain", "body", "luna", "mercury", "saturn", "apollo", "jupiter", "venus", "mars", "date_created", "date_modified" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
CREATE UNIQUE INDEX `user_codename_unique` ON `user` (`codename`);