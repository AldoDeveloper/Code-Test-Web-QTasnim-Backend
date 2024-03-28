/*
  Warnings:

  - You are about to alter the column `product_stock` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `product_sold` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `product_stock` INTEGER NOT NULL,
    MODIFY `product_sold` INTEGER NOT NULL;
