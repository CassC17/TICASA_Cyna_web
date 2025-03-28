import { PrismaClient } from "@prisma/client";
import { PromotionDTO } from '../types/promotion/promotion.dto';
import { CreatePromotionInput, UpdatePromotionInput } from '../types/promotion/promotion.input';

const prisma = new PrismaClient();

export const PromotionRepository = {
  async findAll(): Promise<PromotionDTO[]> {
    return prisma.promotion.findMany();
  },

  async findById(id: number) {
    return prisma.promotion.findUnique({ where: { id } });
  },

  async create(data: CreatePromotionInput) {
    return prisma.promotion.create({ data });
  },

  async update(data: UpdatePromotionInput) {
    const { id, ...rest } = data;
    return prisma.promotion.update({ where: { id }, data: rest });
  },

  async delete(id: number) {
    return prisma.promotion.delete({ where: { id } });
  }
};
