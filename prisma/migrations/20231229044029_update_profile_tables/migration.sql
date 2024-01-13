-- AlterTable
ALTER TABLE `profile` ADD COLUMN `avatar` VARCHAR(255) NULL AFTER `lastname`,
    ADD COLUMN `job` VARCHAR(100) NOT NULL AFTER `avatar`,
    ADD COLUMN `discord` VARCHAR(100) NULL AFTER `twitter`,
    ADD COLUMN `dob` DATE NOT NULL AFTER `email`,
    ADD COLUMN `phone` VARCHAR(100) NOT NULL AFTER `email`,
    ADD COLUMN `address` TEXT NOT NULL AFTER `email`,
    ADD COLUMN `city` VARCHAR(100) NOT NULL AFTER `address`,
    ADD COLUMN `country` VARCHAR(100) NOT NULL AFTER `city`;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `company` VARCHAR(100) NULL AFTER `status`;
