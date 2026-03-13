import { UserRepositoryInterface } from "../repositoryInterface/user-repository.interface";

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(id: number) {
    return await this.userRepository.deleteUser(id);
  }
}
