import { CategoryDTO } from './category.dto';

export class CategoryPresenter {
  static toResponse(dto: CategoryDTO) {
    return {
      id: dto.id,
      name: dto.name,
      description: dto.description,
      image: dto.image,
    };
  }
}
