import { UpdateResult } from "typeorm";
import { TransactionCategory } from "../../../infra/database/typeorm/dt-money/entities/TransactionCategory";

export interface ICreateCategoryInput {
  name: string;
  color?: string;
  userId: number;
}

export interface IUpdateCategoryInput {
  id: number;
  name?: string;
  color?: string;
  userId: number;
}

export interface ICategoryRepository {
  createCategory(data: ICreateCategoryInput): Promise<TransactionCategory>;

  findCategoriesByUserId(userId: number): Promise<TransactionCategory[]>;

  findByNameAndUser(
    name: string,
    userId: number,
  ): Promise<TransactionCategory | null>;

  findByIdAndUser(
    id: number,
    userId: number,
  ): Promise<TransactionCategory | null>;

  updateCategory(data: IUpdateCategoryInput): Promise<TransactionCategory>;

  deleteCategory(id: number): Promise<void>;
}
