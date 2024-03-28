/*
  Warnings:

  - You are about to alter the column `email_verified_at` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime`.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `email_verified_at` DATETIME NULL,
    MODIFY `password` VARCHAR(191) NOT NULL;
