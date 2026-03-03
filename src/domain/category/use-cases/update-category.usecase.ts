import { UnprocessedEntityError } from "../../../shared/errors/unprocessed-entity.error";
import {
  ICategoryRepository,
  IUpdateCategoryInput,
} from "../repositoryInterface/category-repository.interface";

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(data: IUpdateCategoryInput) {
    const category = await this.categoryRepository.findByIdAndUser(
      data.id,
      data.userId,
    );

    if (!category) {
      throw new UnprocessedEntityError([
        "Categoria não encontrada ou você não tem permissão.",
      ]);
    }

    const nameToUpdate = data.name ?? category.name;
    const colorToUpdate = data.color ?? category.color;

    return await this.categoryRepository.updateCategory({
      id: category.id,
      userId: category.userId,
      name: nameToUpdate,
      color: colorToUpdate,
    });
  }
}
