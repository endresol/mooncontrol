ALTER TABLE `avatar_owners` MODIFY COLUMN `id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `avatar_owners` DROP INDEX `avatar_owners_nftId_unique`;--> statement-breakpoint
ALTER TABLE `avatar_owners` DROP COLUMN `nftId`;