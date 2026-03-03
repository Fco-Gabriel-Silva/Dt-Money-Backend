import { IsNull, Repository, UpdateResult } from "typeorm";
import { DtMoneyDataSource } from "../data-source";
import { TransactionCategory } from "../entities/TransactionCategory";
import {
  ICategoryRepository,
  ICreateCategoryInput,
  IUpdateCategoryInput,
} from "../../../../../domain/category/repositoryInterface/category-repository.interface";
import { DatabaseError } from "../../../../../shared/errors/database.error";

export class CategoryTypeormRepository implements ICategoryRepository {
  private repository: Repository<TransactionCategory>;

  constructor() {
    this.repository = DtMoneyDataSource.getRepository(TransactionCategory);
  }

  async createCategory(
    data: ICreateCategoryInput,
  ): Promise<TransactionCategory> {
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

  async findCategoriesByUserId(userId: number): Promise<TransactionCategory[]> {
    try {
      return await this.repository.find({
        where: [{ userId: userId }, { userId: IsNull() }],
        order: {
          name: "ASC",
        },
      });
    } catch (error) {
      throw new DatabaseError("Falha ao buscar categorias", error as Error);
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

  async findByIdAndUser(
    id: number,
    userId: number,
  ): Promise<TransactionCategory | null> {
    return this.repository.findOne({
      where: { id, userId },
    });
  }

  async updateCategory(
    data: IUpdateCategoryInput,
  ): Promise<TransactionCategory> {
    try {
      return await this.repository.save(data);
    } catch (error) {
      throw new DatabaseError("Falha ao editar categoria", error as Error);
    }
  }
}
