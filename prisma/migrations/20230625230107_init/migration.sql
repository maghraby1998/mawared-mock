-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_managerId_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `managerId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_managerId_fkey` FOREIGN KEY (`managerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
