-- CreateTable
CREATE TABLE `access_log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
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
