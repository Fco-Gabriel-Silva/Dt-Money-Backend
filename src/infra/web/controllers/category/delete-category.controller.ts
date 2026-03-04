import { FastifyReply, FastifyRequest } from "fastify";
import { CategoryTypeormRepository } from "../../../database/typeorm/dt-money/repositories/category.repository";
import { DeleteCategoryUseCase } from "../../../../domain/category/use-cases/delete-category.usecase";

interface DeleteCategoryParams {
  id: number;
}

export class DeleteCategoryController {
  execute = async (
    request: FastifyRequest<{ Params: DeleteCategoryParams }>,
    reply: FastifyReply,
  ) => {
    const id = Number(request.params.id);
    const userId = request.user.id;

    const repository = new CategoryTypeormRepository();
    const useCase = new DeleteCategoryUseCase(repository);

    await useCase.execute(id, userId);

    return reply.status(204).send();
  };
}
