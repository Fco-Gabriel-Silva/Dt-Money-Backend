import {
  UpdateUserParams,
  UserRepositoryInterface,
} from "../repositoryInterface/user-repository.interface";

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(userUpdated: UpdateUserParams) {
    const userToUpdate = await this.userRepository.findById(userUpdated.id);

    if (!userToUpdate) {
      throw new Error("User not found");
    }

    return await this.userRepository.updateUser(userUpdated);
  }
}
