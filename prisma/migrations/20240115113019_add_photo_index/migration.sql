-- AlterTable
ALTER TABLE `photo` ADD COLUMN `index` INTEGER NOT NULL DEFAULT 0 AFTER `path_sm`;
