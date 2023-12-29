/*
  Warnings:

  - Added the required column `address` to the `profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profile` ADD COLUMN `address` TEXT NOT NULL,
    ADD COLUMN `discord` VARCHAR(100) NULL AFTER `twitter`,
    ADD COLUMN `dob` DATE NOT NULL AFTER `email`;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `company` VARCHAR(100) NULL AFTER `status`;
