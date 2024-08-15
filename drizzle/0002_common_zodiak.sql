ALTER TABLE `projects` MODIFY COLUMN `createdAt` int NOT NULL DEFAULT (unix_timestamp());--> statement-breakpoint
ALTER TABLE `tasks` MODIFY COLUMN `createdAt` int NOT NULL DEFAULT (unix_timestamp());