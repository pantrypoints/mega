CREATE TABLE `mounts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
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
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `mountsmonth` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
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
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
