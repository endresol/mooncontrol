CREATE TABLE `avatar_owners` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nftId` int NOT NULL,
	`address` varchar(256),
	CONSTRAINT `avatar_owners_id` PRIMARY KEY(`id`),
	CONSTRAINT `address_idx` UNIQUE(`address`)
);
