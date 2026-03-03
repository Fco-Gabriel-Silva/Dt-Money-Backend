import { ICategoryRepository } from "../repositoryInterface/category-repository.interface";
import { UnprocessedEntityError } from "../../../shared/errors/unprocessed-entity.error";

export class DeleteCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: number, userId: number) {
    const category = await this.categoryRepository.findByIdAndUser(id, userId);

    if (!category) {
      throw new UnprocessedEntityError([
        "Categoria não encontrada ou você não tem permissão para excluí-la.",
      ]);
    }

    await this.categoryRepository.deleteCategory(id);
  }
}
