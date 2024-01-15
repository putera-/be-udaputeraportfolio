-- DropForeignKey
ALTER TABLE `project_skills` DROP FOREIGN KEY `project_skills_projectId_fkey`;

-- AddForeignKey
ALTER TABLE `project_skills` ADD CONSTRAINT `project_skills_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
