/*
  Warnings:

  - You are about to drop the column `companyId` on the `Currency` table. All the data in the column will be lost.
  - You are about to drop the column `currencyId` on the `Office` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Currency` DROP FOREIGN KEY `Currency_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `Office` DROP FOREIGN KEY `Office_currencyId_fkey`;

-- AlterTable
ALTER TABLE `Currency` DROP COLUMN `companyId`;

-- AlterTable
ALTER TABLE `Office` DROP COLUMN `currencyId`;
