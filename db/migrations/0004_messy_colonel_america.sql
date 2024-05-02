CREATE TABLE `nfts_apenft` (
	`id` bigint AUTO_INCREMENT,
	`nft_id` int,
	`address` varchar(256)
);
--> statement-breakpoint
CREATE INDEX `address_idx` ON `nfts_apenft` (`address`);