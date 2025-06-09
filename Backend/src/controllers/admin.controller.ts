import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);

    const dailySales = await prisma.order.groupBy({
      by: ["buyDate"],
      where: {
        buyDate: { gte: weekAgo },
      },
      _sum: {
        totalprice: true,
      },
      orderBy: {
        buyDate: "asc",
      },
    });

    const categorySales = await prisma.orderItem.findMany({
      where: {
        order: {
          buyDate: { gte: weekAgo },
        },
        productId: {
          not: null,
        },
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    });

    const salesByCategory: Record<string, number> = {};

    for (const item of categorySales) {
      const catName = item.product?.category?.name || "Inconnu";
      salesByCategory[catName] = (salesByCategory[catName] || 0) + item.price;
    }

    const categorySalesFormatted = Object.entries(salesByCategory).map(
      ([category, total]) => ({
        category,
        total,
      })
    );

    res.json({ dailySales, categorySales: categorySalesFormatted });
  } catch (error) {
    next(error);
  }
};
