import { UnprocessedEntityError } from "../../../shared/errors/unprocessed-entity.error";
import {
  UpdateUserParams,
  UserRepositoryInterface,
} from "../repositoryInterface/user-repository.interface";
import { hashSync } from "bcrypt";

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(userUpdated: UpdateUserParams) {
    const userToUpdate = await this.userRepository.findById(userUpdated.id);

    if (!userToUpdate) {
      throw new UnprocessedEntityError(["Usuário não encontrado"]);
    }

    if (
      userUpdated.password &&
      userUpdated.password !== userToUpdate.password
    ) {
      userUpdated.password = hashSync(userUpdated.password, 10);
    }

    return await this.userRepository.updateUser(userUpdated);
  }
}
