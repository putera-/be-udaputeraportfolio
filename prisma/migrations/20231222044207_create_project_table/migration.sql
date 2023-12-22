-- CreateTable
CREATE TABLE `project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `url` VARCHAR(100) NULL,
    `github` VARCHAR(100) NULL,
    `gitlab` VARCHAR(100) NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NULL,
    `status` ENUM('ON_PROGRESS', 'COMPLETE', 'MAINTENANCE') NULL DEFAULT 'ON_PROGRESS',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `project_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;
