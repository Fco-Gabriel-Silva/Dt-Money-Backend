import {
  ICategoryRepository,
  ICreateCategoryInput,
} from "../repositoryInterface/category-repository.interface";
import { UnprocessedEntityError } from "../../../shared/errors/unprocessed-entity.error";

export class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(data: ICreateCategoryInput) {
    const categoryExists = await this.categoryRepository.findByNameAndUser(
      data.name,
      data.userId,
    );

    if (categoryExists) {
      throw new UnprocessedEntityError([
        "Você já possui uma categoria com esse nome.",
      ]);
    }

    return await this.categoryRepository.createCategory(data);
  }
}
