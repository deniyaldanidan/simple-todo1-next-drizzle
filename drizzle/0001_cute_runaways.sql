ALTER TABLE `projects` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT now();--> statement-breakpoint
ALTER TABLE `tasks` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT now();