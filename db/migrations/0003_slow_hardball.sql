ALTER TABLE `avatar_owners` DROP INDEX `address_idx`;--> statement-breakpoint
CREATE INDEX `address_idx` ON `avatar_owners` (`address`);