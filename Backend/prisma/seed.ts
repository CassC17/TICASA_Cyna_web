import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create some users
    const user1 = await prisma.user.create({
        data: {
            nom: 'Doe',
            prenom: 'John',
            email: 'john.doe@example.com',
            password: 'password123',
            isAdmin: true,
            isLoggedIn: false,
        },
    });

    const user2 = await prisma.user.create({
        data: {
            nom: 'Smith',
            prenom: 'Jane',
            email: 'jane.smith@example.com',
            password: 'password123',
            isAdmin: false,
            isLoggedIn: false,
        },
    });

    // Create some product categories
    const category1 = await prisma.productCategory.create({
        data: {
            name: 'Electronics',
            description: 'Electronic devices and gadgets',
        },
    });

    const category2 = await prisma.productCategory.create({
        data: {
            name: 'Books',
            description: 'Various kinds of books',
        },
    });

    // Create some products
    const product1 = await prisma.product.create({
        data: {
            name: 'Smartphone',
            price: 699.99,
            fournisseur: 'TechCorp',
            categoryId: category1.id,
        },
    });

    const product2 = await prisma.product.create({
        data: {
            name: 'Laptop',
            price: 1299.99,
            fournisseur: 'CompuWorld',
            categoryId: category1.id,
        },
    });

    const product3 = await prisma.product.create({
        data: {
            name: 'Novel',
            price: 19.99,
            fournisseur: 'BookHouse',
            categoryId: category2.id,
        },
    });

    // Create some promotions
    const promotion1 = await prisma.promotion.create({
        data: {
            name: 'Summer Sale',
            priceReduction: 10,
        },
    });

    // Assign promotion to a product
    await prisma.product.update({
        where: { id: product1.id },
        data: { activePromoId: promotion1.id },
    });





    // Create user info
    await prisma.userInfo.create({
        data: {
            userId: user1.id,
            paymentMean: 'Credit Card',
            paymentNum: '1234-5678-9012-3456',
            paymentDate: '12/23',
        },
    });

    await prisma.userInfo.create({
        data: {
            userId: user2.id,
            paymentMean: 'PayPal',
            paymentNum: 'jane.smith@paypal.com',
            paymentDate: 'N/A',
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        globalThis.process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });


    