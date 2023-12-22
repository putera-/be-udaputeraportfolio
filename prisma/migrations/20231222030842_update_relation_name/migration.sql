/*
  Warnings:

  - You are about to drop the column `category_id` on the `skill` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `skill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `skill` DROP FOREIGN KEY `skill_category_id_fkey`;

-- AlterTable
ALTER TABLE `skill` DROP COLUMN `category_id`,
    ADD COLUMN `categoryId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `skill` ADD CONSTRAINT `skill_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `skill_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
