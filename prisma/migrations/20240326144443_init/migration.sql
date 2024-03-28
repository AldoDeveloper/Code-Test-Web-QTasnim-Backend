/*
  Warnings:

  - A unique constraint covering the columns `[category_name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Category` MODIFY `slugh` VARCHAR(255) NOT NULL,
    MODIFY `category_name` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Category_category_name_key` ON `Category`(`category_name`);

-- CreateIndex
CREATE UNIQUE INDEX `Product_product_name_key` ON `Product`(`product_name`);
