CREATE TABLE `mal_spending` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`address` varchar(256),
	`quantity` int,
	`transactiontime` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `mal_spending_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `raffle_tickets` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`address` varchar(256),
	`quantity` int,
	`raffle_id` int,
	`transaction` varchar(150),
	CONSTRAINT `raffle_tickets_id` PRIMARY KEY(`id`)
);
