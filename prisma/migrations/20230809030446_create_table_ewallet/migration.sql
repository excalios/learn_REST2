-- CreateTable
CREATE TABLE `Ewallet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `balance` INTEGER NOT NULL DEFAULT 0,
    `transfer` INTEGER NOT NULL DEFAULT 0,
    `withdraw` INTEGER NOT NULL DEFAULT 0,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Ewallet_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ewallet` ADD CONSTRAINT `Ewallet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
