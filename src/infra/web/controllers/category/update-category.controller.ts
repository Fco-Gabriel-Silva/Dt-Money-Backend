import { FastifyReply, FastifyRequest } from "fastify";
import { CategoryTypeormRepository } from "../../../database/typeorm/dt-money/repositories/category.repository";
import { UpdateCategoryUseCase } from "../../../../domain/category/use-cases/update-category.usecase";

interface UpdateCategoryBody {
  name: string;
  color?: string;
}

interface UpdateCategoryParams {
  id: number;
}

export class UpdateCategoryController {
  execute = async (
    request: FastifyRequest<{
      Params: UpdateCategoryParams;
      Body: UpdateCategoryBody;
    }>,
    reply: FastifyReply,
  ) => {
    const id = Number(request.params.id);
    const { name, color } = request.body;
    const userId = request.user.id;

    const repository = new CategoryTypeormRepository();
    const useCase = new UpdateCategoryUseCase(repository);

    const category = await useCase.execute({ id, name, color, userId });

    return reply.status(200).send(category);
  };
}
