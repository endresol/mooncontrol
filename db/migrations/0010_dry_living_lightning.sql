CREATE TABLE `staking_holdings` (
    `holding_id` bigint AUTO_INCREMENT NOT NULL,
    `address` varchar(255) NOT NULL,
    `contract` varchar(255) NOT NULL,
    `token_id` varchar(255) NOT NULL,
    `snapshot_date` datetime NOT NULL,
    `holding_month` varchar(7) NOT NULL,
    CONSTRAINT `staking_holdings_holding_id` PRIMARY KEY (`holding_id`)
);
--> statement-breakpoint
CREATE TABLE `staking_rewards` (
    `reward_id` bigint AUTO_INCREMENT NOT NULL,
    `address` varchar(255) NOT NULL,
    `holding_month` varchar(7) NOT NULL,
    `contract_a_reward` int DEFAULT 0,
    `contract_b_reward` int DEFAULT 0,
    `contract_c_reward` int DEFAULT 0,
    `same_id_bonus` int DEFAULT 0,
    `total_reward` int NOT NULL,
    `claim_status` varchar(20) NOT NULL DEFAULT 'unclaimed',
    `claim_expiry` datetime NOT NULL,
    CONSTRAINT `staking_rewards_reward_id` PRIMARY KEY (`reward_id`)
);
--> statement-breakpoint
CREATE TABLE `staking_users` (
    `id` bigint AUTO_INCREMENT NOT NULL,
    `address` varchar(255) NOT NULL,
    `created_at` timestamp DEFAULT(now()),
    CONSTRAINT `staking_users_id` PRIMARY KEY (`id`)
);
--> statement-breakpoint
ALTER TABLE `nfts_apenft` MODIFY COLUMN `nft_id` int NOT NULL;