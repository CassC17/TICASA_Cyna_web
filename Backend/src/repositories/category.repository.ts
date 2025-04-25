import { PrismaClient } from "@prisma/client";
import { CreateCategoryInput, UpdateCategoryInput } from '../types/category/category.input';

const prisma = new PrismaClient();

export const CategoryRepository = {
  async findAll() {
    return prisma.productCategory.findMany();
  },

  async findById(id: number) {
    return prisma.productCategory.findUnique({ where: { id } });
  },

  async create(data: CreateCategoryInput) {
    return prisma.productCategory.create({ data });
  },

  async update(data: UpdateCategoryInput) {
    const { id, ...rest } = data;
    return prisma.productCategory.update({ where: { id }, data: rest });
  },

  async delete(id: number) {
    return prisma.productCategory.delete({ where: { id } });
  },

  async findProductsByCategoryId(categoryId: number) {
    return prisma.product.findMany({
      where: { categoryId },
    });
  }
};
