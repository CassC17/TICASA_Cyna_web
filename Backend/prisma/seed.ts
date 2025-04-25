import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      nom: 'Doe',
      prenom: 'John',
      email: 'john.doe@example.com',
      password: 'password123',
      isAdmin: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      nom: 'Smith',
      prenom: 'Jane',
      email: 'jane.smith@example.com',
      password: 'password123',
      isAdmin: false,
    },
  });

  // Create Product Categories
  const electronics = await prisma.productCategory.create({
    data: {
      name: 'Electronics',
      description: 'Electronic devices and gadgets',
    },
  });

  const books = await prisma.productCategory.create({
    data: {
      name: 'Books',
      description: 'Various kinds of books',
    },
  });

  // Create Products
  const smartphone = await prisma.product.create({
    data: {
      name: 'Smartphone',
      price: 699.99,
      fournisseur: 'TechCorp',
      categoryId: electronics.id,
    },
  });

  const laptop = await prisma.product.create({
    data: {
      name: 'Laptop',
      price: 1299.99,
      fournisseur: 'CompuWorld',
      categoryId: electronics.id,
    },
  });

  const novel = await prisma.product.create({
    data: {
      name: 'Novel',
      price: 19.99,
      fournisseur: 'BookHouse',
      categoryId: books.id,
    },
  });

  // Create Promotion and apply to product
  const promo = await prisma.promotion.create({
    data: {
      name: 'Summer Sale',
      priceReduction: 15,
    },
  });

  await prisma.product.update({
    where: { id: smartphone.id },
    data: {
      activePromoId: promo.id,
    },
  });

  // Create Promoted Product
  await prisma.promotedProduct.create({
    data: {
      productId: smartphone.id,
      name: 'Smartphone - Special Edition',
      price: 649.99,
    },
  });

  // Create Orders
  const order1 = await prisma.order.create({
    data: {
      userId: user1.id,
      totalprice: 699.99,
      orderItems: {
        create: [
          {
            productId: smartphone.id,
            productPrice: smartphone.price,
            productQty: 1,
            price: smartphone.price,
          },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      userId: user2.id,
      totalprice: 1319.98,
      orderItems: {
        create: [
          {
            productId: laptop.id,
            productPrice: laptop.price,
            productQty: 1,
            price: laptop.price,
          },
          {
            productId: novel.id,
            productPrice: novel.price,
            productQty: 1,
            price: novel.price,
          },
        ],
      },
    },
  });

  // Create User Info
  await prisma.userInfo.create({
    data: {
      userId: user1.id,
      paymentMean: 'Credit Card',
      paymentNum: '1234-5678-9012-3456',
    },
  });

  await prisma.userInfo.create({
    data: {
      userId: user2.id,
      paymentMean: 'PayPal',
      paymentNum: 'jane.smith@paypal.com',
    },
  });

  // Create Active Subscriptions
  await prisma.activeSubscription.create({
    data: {
      userId: user1.id,
      productId: smartphone.id,
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)),
    },
  });

  await prisma.activeSubscription.create({
    data: {
      userId: user2.id,
      productId: novel.id,
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    },
  });

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
