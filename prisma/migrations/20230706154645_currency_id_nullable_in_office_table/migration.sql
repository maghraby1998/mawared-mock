-- DropForeignKey
ALTER TABLE `Office` DROP FOREIGN KEY `Office_currencyId_fkey`;

-- AlterTable
ALTER TABLE `Office` MODIFY `currencyId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Office` ADD CONSTRAINT `Office_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `Currency`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
