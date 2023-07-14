-- CreateTable
CREATE TABLE `OfficeCurrencies` (
    `officeId` INTEGER NOT NULL,
    `currencyId` INTEGER NOT NULL,

    PRIMARY KEY (`officeId`, `currencyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OfficeCurrencies` ADD CONSTRAINT `OfficeCurrencies_officeId_fkey` FOREIGN KEY (`officeId`) REFERENCES `Office`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OfficeCurrencies` ADD CONSTRAINT `OfficeCurrencies_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `Currency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
