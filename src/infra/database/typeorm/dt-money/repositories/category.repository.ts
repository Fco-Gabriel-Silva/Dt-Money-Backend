import { Repository } from "typeorm";
import { DtMoneyDataSource } from "../data-source";
import { TransactionCategory } from "../entities/TransactionCategory";
import {
  ICategoryRepository,
  ICreateCategoryInput,
} from "../../../../../domain/category/repositoryInterface/category-repository.interface";
import { DatabaseError } from "../../../../../shared/errors/database.error";

export class CategoryTypeormRepository implements ICategoryRepository {
  private repository: Repository<TransactionCategory>;

  constructor() {
    this.repository = DtMoneyDataSource.getRepository(TransactionCategory);
  }

  async create(data: ICreateCategoryInput): Promise<TransactionCategory> {
    try {
      const category = this.repository.create({
        name: data.name,
        color: data.color,
        userId: data.userId,
      });
      return await this.repository.save(category);
    } catch (error) {
      throw new DatabaseError("Falha ao criar categoria", error as Error);
    }
  }

  async findByNameAndUser(
    name: string,
    userId: number,
  ): Promise<TransactionCategory | null> {
    return this.repository.findOne({
      where: { name, userId },
    });
  }
}
