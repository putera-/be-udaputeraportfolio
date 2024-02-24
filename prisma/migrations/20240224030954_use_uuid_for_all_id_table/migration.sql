/*
  Warnings:

  - The primary key for the `access_log` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `education` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `experience` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `photo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `project_skills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `skill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `skill_category` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `photo` DROP FOREIGN KEY `photo_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `project_skills` DROP FOREIGN KEY `project_skills_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `project_skills` DROP FOREIGN KEY `project_skills_skillId_fkey`;

-- DropForeignKey
ALTER TABLE `skill` DROP FOREIGN KEY `skill_categoryId_fkey`;

-- AlterTable
ALTER TABLE `access_log` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `education` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `experience` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `photo` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `projectId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `project` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `project_skills` DROP PRIMARY KEY,
    MODIFY `projectId` VARCHAR(191) NOT NULL,
    MODIFY `skillId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`projectId`, `skillId`);

-- AlterTable
ALTER TABLE `skill` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `categoryId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `skill_category` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `skill` ADD CONSTRAINT `skill_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `skill_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `photo` ADD CONSTRAINT `photo_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_skills` ADD CONSTRAINT `project_skills_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_skills` ADD CONSTRAINT `project_skills_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
