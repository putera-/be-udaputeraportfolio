/*
  Warnings:

  - The primary key for the `blog` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `photo` DROP FOREIGN KEY `photo_blogId_fkey`;

-- AlterTable
ALTER TABLE `blog` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `photo` MODIFY `blogId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `photo` ADD CONSTRAINT `photo_blogId_fkey` FOREIGN KEY (`blogId`) REFERENCES `blog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
