ALTER TABLE `products` ADD `amount` real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `date_amount_change` text DEFAULT (CURRENT_TIMESTAMP);