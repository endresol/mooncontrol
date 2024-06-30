CREATE TABLE `raffle_lottery_tickets` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`address` varchar(256),
	`winner` boolean,
	CONSTRAINT `raffle_lottery_tickets_id` PRIMARY KEY(`id`)
);
