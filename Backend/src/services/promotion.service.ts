import { PromotionRepository } from '../repositories/promotion.repository';
import { CreatePromotionInput, UpdatePromotionInput } from '../types/promotion/promotion.input';

export const PromotionService = {
  async getAllPromotions() {
    return PromotionRepository.findAll();
  },

  async getPromotionById(id: number) {
    return PromotionRepository.findById(id);
  },

  async createPromotion(data: CreatePromotionInput) {
    return PromotionRepository.create(data);
  },

  async updatePromotion(data: UpdatePromotionInput) {
    return PromotionRepository.update(data);
  },

  async deletePromotion(id: number) {
    return PromotionRepository.delete(id);
  }
};
