import { PromotionDTO } from './promotion.dto';

export class PromotionPresenter {
    static toResponse(dto: PromotionDTO) {
      return {
        id: dto.id,
        name: dto.name,
        priceReduction: dto.priceReduction,
      };
    }
  }
