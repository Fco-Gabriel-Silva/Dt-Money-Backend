import { FastifyRequest, FastifyReply } from "fastify";
import { UserTypeormRepository } from "../../../database/typeorm/dt-money/repositories/user.repository";
import { UpdateUserUseCase } from "../../../../domain/user/use-cases/update-user.usecase";

interface UpdateUserBody {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
  phone?: string;
}

interface UpdateUserParams {
  id: number;
}

export class UpdateUserController {
  execute = async (
    request: FastifyRequest<{ Body: UpdateUserBody; Params: UpdateUserParams }>,
    reply: FastifyReply,
  ) => {
    const id = Number(request.params.id);
    const { name, email, password, avatarUrl, phone } = request.body;

    const repository = new UserTypeormRepository();
    const useCase = new UpdateUserUseCase(repository);

    const user = await useCase.execute({
      id,
      name,
      email,
      password,
      avatarUrl,
      phone,
    });

    return reply.status(200).send(user);
  };
}
