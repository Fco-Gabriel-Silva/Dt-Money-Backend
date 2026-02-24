import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCategoryUseCase } from "../../../../domain/category/use-cases/create-category.usecase";
import { CategoryTypeormRepository } from "../../../database/typeorm/dt-money/repositories/category.repository";

interface CreateCategoryBody {
  name: string;
  color?: string;
}

export class CreateCategoryController {
  execute = async (
    request: FastifyRequest<{ Body: CreateCategoryBody }>,
    reply: FastifyReply,
  ) => {
    const { name, color } = request.body;
    const userId = request.user.id; // Pegando o usuário logado perfeitamente!

    const repository = new CategoryTypeormRepository();
    const useCase = new CreateCategoryUseCase(repository);

    const category = await useCase.execute({ name, color, userId });

    return reply.status(201).send(category);
  };
}
