import { User } from "../../../infra/database/typeorm/dt-money/entities/User";

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
  phone?: string;
}

export interface UpdateUserParams {
  id: number;
  name?: string;
  email?: string;
  password?: string;
  avatarUrl?: string;
  phone?: string;
}

export interface UserRepositoryInterface {
  createUser(user: CreateUserParams): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: number): Promise<User>;
  updateUser(user: UpdateUserParams): Promise<User>;
  deleteUser(id: number): Promise<void>;
}
