-- AlterTable
ALTER TABLE `profile` ADD COLUMN `avatar_md` VARCHAR(255) NULL AFTER `avatar`,
    ADD COLUMN `avatar_sm` VARCHAR(255) NULL AFTER `avatar_md`;
