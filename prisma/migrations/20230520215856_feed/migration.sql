-- CreateTable
CREATE TABLE `feed` (
    `id` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `idUser` VARCHAR(191) NOT NULL,
    `idUserLike` BOOLEAN NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `imgPerfil` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `rgb` VARCHAR(191) NOT NULL,
    `texto` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
