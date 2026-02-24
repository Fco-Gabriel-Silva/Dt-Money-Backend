import { FastifyInstance } from "fastify";
import { CreateCategoryController } from "../controllers/category/create-category.controller";
import { CheckAuthtenticationMiddleware } from "../middlewares/check-authentication";
import { createCategorySchema } from "./schemas/category/create-category.schema";

export const configure = (fastify: FastifyInstance) => {
  const createCategory = new CreateCategoryController();
  const checkAuthenticated = new CheckAuthtenticationMiddleware();

  fastify.route({
    url: "/category",
    method: "post",
    handler: createCategory.execute,
    preHandler: [checkAuthenticated.execute],
    schema: createCategorySchema,
  });
};
