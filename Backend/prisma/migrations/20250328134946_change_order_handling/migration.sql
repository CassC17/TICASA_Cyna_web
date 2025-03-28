/*
  Warnings:

  - You are about to alter the column `paymentDate` on the `userinfo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `DateTime(3)`.
  - You are about to drop the `basket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `basketitem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `product_ibfk_1` ON `product`;

-- DropIndex
DROP INDEX `product_ibfk_2` ON `product`;

-- DropIndex
DROP INDEX `promoted_products_ibfk_1` ON `promotedproduct`;

-- DropIndex
DROP INDEX `user_info_ibfk_1` ON `userinfo`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `disponibility` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `userinfo` MODIFY `paymentDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `basket`;

-- DropTable
DROP TABLE `basketitem`;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `totalprice` DOUBLE NOT NULL,
    `delivered` INTEGER NOT NULL DEFAULT 0,
    `buyDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `productId` INTEGER NULL,
    `productPrice` FLOAT NULL,
    `productQty` INTEGER NOT NULL DEFAULT 1,
    `price` FLOAT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActiveSubscription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`activePromoId`) REFERENCES `Promotion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `ProductCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PromotedProduct` ADD CONSTRAINT `promoted_products_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserInfo` ADD CONSTRAINT `user_info_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActiveSubscription` ADD CONSTRAINT `active_subscription_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActiveSubscription` ADD CONSTRAINT `active_subscription_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
