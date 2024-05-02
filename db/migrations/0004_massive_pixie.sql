CREATE TABLE `nfts_apenft` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`nft_id` int,
	`address` varchar(256),
	CONSTRAINT `nfts_apenft_id` PRIMARY KEY(`id`)
);
