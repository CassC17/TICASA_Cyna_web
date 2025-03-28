import { CategoryRepository } from '../repositories/category.repository';
import { CreateCategoryInput, UpdateCategoryInput } from '../types/category/category.input';

export const CategoryService = {
  async getAllCategories() {
    return CategoryRepository.findAll();
  },

  async getCategoryById(id: number) {
    return CategoryRepository.findById(id);
  },

  async createCategory(data: CreateCategoryInput) {
    return CategoryRepository.create(data);
  },

  async updateCategory(data: UpdateCategoryInput) {
    return CategoryRepository.update(data);
  },

  async deleteCategory(id: number) {
    return CategoryRepository.delete(id);
  }
};
