import { FastifyReply, FastifyRequest } from "fastify";
import { CategoryTypeormRepository } from "../../../database/typeorm/dt-money/repositories/category.repository";
import { GetCategoryUseCase } from "../../../../domain/category/use-cases/get-category.usecase";

export class GetCategoryController {
  execute = async (request: FastifyRequest, reply: FastifyReply) => {
    const userId = request.user.id;

    const repository = new CategoryTypeormRepository();
    const useCase = new GetCategoryUseCase(repository);

    const categories = await useCase.execute(userId);

    return reply.status(200).send(categories);
  };
}
