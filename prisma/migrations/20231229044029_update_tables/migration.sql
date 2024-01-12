-- AlterTable
ALTER TABLE `profile` ADD COLUMN `address` TEXT NOT NULL AFTER `email`,
    ADD COLUMN `discord` VARCHAR(100) NULL AFTER `twitter`,
    ADD COLUMN `dob` DATE NOT NULL AFTER `email`;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `company` VARCHAR(100) NULL AFTER `status`;
