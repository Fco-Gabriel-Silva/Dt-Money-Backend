import { TransactionCategory } from "../../../infra/database/typeorm/dt-money/entities/TransactionCategory";

export interface ICreateCategoryInput {
  name: string;
  color?: string;
  userId: number; // Mudamos para number
}

export interface ICategoryRepository {
  create(data: ICreateCategoryInput): Promise<TransactionCategory>;
  findByNameAndUser(
    name: string,
    userId: number,
  ): Promise<TransactionCategory | null>;
}
