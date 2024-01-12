-- AlterTable
ALTER TABLE `profile` ADD COLUMN `city` VARCHAR(100) NOT NULL AFTER `address`,
    ADD COLUMN `country` VARCHAR(100) NOT NULL AFTER `address`,
    ADD COLUMN `phone` VARCHAR(100) NOT NULL AFTER `email`,
    ADD COLUMN `job` VARCHAR(100) NOT NULL AFTER `lastname`;
