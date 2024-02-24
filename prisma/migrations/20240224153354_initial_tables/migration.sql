-- CreateTable
CREATE TABLE `user` (
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `token` VARCHAR(200) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profile` (
    `firstname` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `avatar` VARCHAR(255) NULL,
    `avatar_md` VARCHAR(255) NULL,
    `avatar_sm` VARCHAR(255) NULL,
    `job` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(100) NOT NULL,
    `dob` DATE NOT NULL,
    `address` TEXT NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `bio` TEXT NULL,
    `web` VARCHAR(100) NULL,
    `github` VARCHAR(100) NULL,
    `gitlab` VARCHAR(100) NULL,
    `linkedin` VARCHAR(100) NULL,
    `instagram` VARCHAR(100) NULL,
    `facebook` VARCHAR(100) NULL,
    `twitter` VARCHAR(100) NULL,
    `discord` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skill_category` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `skill_category_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skill` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `svg` TEXT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `education` (
    `id` VARCHAR(191) NOT NULL,
    `institutionName` VARCHAR(100) NOT NULL,
    `startYear` YEAR NOT NULL,
    `endYear` YEAR NULL,
    `major` VARCHAR(100) NULL,
    `degree` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `experience` (
    `id` VARCHAR(191) NOT NULL,
    `company` VARCHAR(100) NOT NULL,
    `location` VARCHAR(100) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `url` VARCHAR(100) NULL,
    `github` VARCHAR(100) NULL,
    `gitlab` VARCHAR(100) NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NULL,
    `status` ENUM('ON_PROGRESS', 'COMPLETE', 'MAINTENANCE') NULL DEFAULT 'ON_PROGRESS',
    `company` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `project_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `photo` (
    `id` VARCHAR(191) NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    `path_md` VARCHAR(255) NOT NULL,
    `path_sm` VARCHAR(255) NOT NULL,
    `index` INTEGER NOT NULL DEFAULT 0,
    `projectId` VARCHAR(191) NULL,
    `blogId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_skills` (
    `projectId` VARCHAR(191) NOT NULL,
    `skillId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`projectId`, `skillId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blog` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `error_log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `level` VARCHAR(16) NOT NULL,
    `message` TEXT NOT NULL,
    `meta` TEXT NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `access_log` (
    `id` VARCHAR(191) NOT NULL,
    `session` VARCHAR(50) NOT NULL,
    `ip` VARCHAR(50) NOT NULL,
    `path` VARCHAR(100) NOT NULL,
    `user_agent` VARCHAR(255) NOT NULL,
    `country` VARCHAR(100) NULL,
    `countryCode` VARCHAR(10) NULL,
    `city` VARCHAR(100) NULL,
    `lat` DOUBLE NULL,
    `lon` DOUBLE NULL,
    `isMobile` BOOLEAN NOT NULL,
    `isDesktop` BOOLEAN NOT NULL,
    `isWindows` BOOLEAN NOT NULL,
    `isMacOS` BOOLEAN NOT NULL,
    `isAndroid` BOOLEAN NOT NULL,
    `isIos` BOOLEAN NOT NULL,
    `isFirefox` BOOLEAN NOT NULL,
    `isEdge` BOOLEAN NOT NULL,
    `isChrome` BOOLEAN NOT NULL,
    `isSafari` BOOLEAN NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `skill` ADD CONSTRAINT `skill_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `skill_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `photo` ADD CONSTRAINT `photo_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `photo` ADD CONSTRAINT `photo_blogId_fkey` FOREIGN KEY (`blogId`) REFERENCES `blog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_skills` ADD CONSTRAINT `project_skills_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_skills` ADD CONSTRAINT `project_skills_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
