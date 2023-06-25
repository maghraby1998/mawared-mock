/*
  Warnings:

  - Made the column `userTypeId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_userTypeId_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `userTypeId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userTypeId_fkey` FOREIGN KEY (`userTypeId`) REFERENCES `UserType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
