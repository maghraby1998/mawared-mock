/*
  Warnings:

  - You are about to drop the `OfficeCurrencies` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `currencyId` to the `Office` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `OfficeCurrencies` DROP FOREIGN KEY `OfficeCurrencies_currencyId_fkey`;

-- DropForeignKey
ALTER TABLE `OfficeCurrencies` DROP FOREIGN KEY `OfficeCurrencies_officeId_fkey`;

-- AlterTable
ALTER TABLE `Office` ADD COLUMN `currencyId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `OfficeCurrencies`;

-- AddForeignKey
ALTER TABLE `Office` ADD CONSTRAINT `Office_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `Currency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
