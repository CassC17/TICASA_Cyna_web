-- DropIndex
DROP INDEX `basket_ibfk_1` ON `basket`;

-- DropIndex
DROP INDEX `basket_ibfk_2` ON `basket`;

-- DropIndex
DROP INDEX `basket_item_ibfk_1` ON `basketitem`;

-- DropIndex
DROP INDEX `product_ibfk_1` ON `product`;

-- DropIndex
DROP INDEX `product_ibfk_2` ON `product`;

-- DropIndex
DROP INDEX `promoted_products_ibfk_1` ON `promotedproduct`;

-- DropIndex
DROP INDEX `user_info_ibfk_1` ON `userinfo`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `description` VARCHAR(255) NOT NULL DEFAULT 'placeholder',
    ADD COLUMN `images` VARCHAR(255) NOT NULL DEFAULT 'placeholder';

-- AddForeignKey
ALTER TABLE `Basket` ADD CONSTRAINT `basket_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Basket` ADD CONSTRAINT `basket_ibfk_2` FOREIGN KEY (`basketItemId`) REFERENCES `BasketItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BasketItem` ADD CONSTRAINT `basket_item_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`activePromoId`) REFERENCES `Promotion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `ProductCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PromotedProduct` ADD CONSTRAINT `promoted_products_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserInfo` ADD CONSTRAINT `user_info_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
