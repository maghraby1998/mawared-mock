/*
  Warnings:

  - You are about to drop the column `officeId` on the `Department` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `Department` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Department` DROP FOREIGN KEY `Department_officeId_fkey`;

-- AlterTable
ALTER TABLE `Department` DROP COLUMN `officeId`,
    ADD COLUMN `companyId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Department` ADD CONSTRAINT `Department_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
