CREATE TABLE `message` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`sender` text NOT NULL,
	`receiver` text NOT NULL,
	`date_created` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`sender`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`receiver`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
