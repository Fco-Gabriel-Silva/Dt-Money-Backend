import { ICategoryRepository } from "../repositoryInterface/category-repository.interface";

export class GetCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(userId: number) {
    return await this.categoryRepository.findCategoriesByUserId(userId);
  }
}
