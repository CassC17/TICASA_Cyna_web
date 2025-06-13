import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { cartItems } = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      res.status(400).json({ error: "Le panier est vide" });
      return;
    }

    const total = cartItems.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        userId,
        totalprice: total,
        orderItems: {
          create: cartItems.map((item: any) => ({
            productId: item.id,
            productPrice: item.price,
            productQty: item.quantity,
            price: item.price * item.quantity,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    res.status(201).json({ message: "Commande créée avec succès", order });
  } catch (error) {
    next(error);
  }
};

export const getUserOrdersByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as any).user.id; // Injecté par le middleware d’auth

    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { buyDate: "desc" },
      include: {
        orderItems: {
          include: { product: true },
        },
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
