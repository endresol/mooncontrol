CREATE TABLE `raffle_prizes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	`prize` int,
	`address` varchar(256),
	`ticket` int,
	CONSTRAINT `raffle_prizes_id` PRIMARY KEY(`id`)
);
