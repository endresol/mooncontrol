ALTER TABLE `staking_holdings` MODIFY COLUMN `holding_id` bigint AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `staking_rewards` MODIFY COLUMN `reward_id` bigint AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `staking_users` MODIFY COLUMN `id` bigint AUTO_INCREMENT NOT NULL;