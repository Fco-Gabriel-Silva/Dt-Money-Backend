import { User } from "../entities/User";
import {
  UserRepositoryInterface,
  CreateUserParams,
  UpdateUserParams,
} from "../../../../../domain/user/repositoryInterface/user-repository.interface";
import { Repository } from "typeorm";
import { DtMoneyDataSource } from "../data-source";
import { DatabaseError } from "../../../../../shared/errors/database.error";

export class UserTypeormRepository implements UserRepositoryInterface {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = DtMoneyDataSource.getRepository(User);
  }

  async createUser(user: CreateUserParams): Promise<User> {
    try {
      const userCreated = await this.userRepository.save(user);
      return userCreated;
    } catch (error) {
      throw new DatabaseError("Falha ao criar o usuário!", error);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email,
        },
      });
      return user;
    } catch (error) {
      throw new DatabaseError("Falha ao buscar usuário!", error);
    }
  }

  async findById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      return user;
    } catch (error) {
      throw new DatabaseError("Falha ao buscar usuário!", error);
    }
  }

  async updateUser(user: UpdateUserParams): Promise<User> {
    try {
      const userUpdated = await this.userRepository.save(user);
      return userUpdated;
    } catch (error) {
      throw new DatabaseError("Falha ao atualizar o usuário!", error);
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await this.userRepository.softDelete(id);
    } catch (error) {
      throw new DatabaseError("Falha ao deletar o usuário!", error);
    }
  }
}
