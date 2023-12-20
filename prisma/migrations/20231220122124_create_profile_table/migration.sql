-- CreateTable
CREATE TABLE `profile` (
    `firstname` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `bio` TEXT NULL,
    `web` TEXT NULL,
    `github` TEXT NULL,
    `gitlab` TEXT NULL,
    `linkedin` TEXT NULL,
    `instagram` TEXT NULL,
    `facebook` TEXT NULL,
    `twitter` TEXT NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;
