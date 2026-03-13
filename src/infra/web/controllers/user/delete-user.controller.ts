import { FastifyRequest, FastifyReply } from "fastify";
import { UserTypeormRepository } from "../../../database/typeorm/dt-money/repositories/user.repository";
import { DeleteUserUseCase } from "../../../../domain/user/use-cases/delete-user.usecase";

interface DeleteUserParams {
  id: number;
}

export class DeleteUserController {
  execute = async (
    request: FastifyRequest<{ Params: DeleteUserParams }>,
    reply: FastifyReply,
  ) => {
    const id = Number(request.params.id);

    const repository = new UserTypeormRepository();
    const useCase = new DeleteUserUseCase(repository);

    await useCase.execute(id);

    return reply.status(204).send();
  };
}
