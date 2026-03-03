import { FastifyInstance } from "fastify";
import { CreateCategoryController } from "../controllers/category/create-category.controller";
import { UpdateCategoryController } from "../controllers/category/update-category.controller";
import { CheckAuthtenticationMiddleware } from "../middlewares/check-authentication";
import { createCategorySchema } from "./schemas/category/create-category.schema";
import { updateCategorySchema } from "./schemas/category/update-category.schema";

export const configure = (fastify: FastifyInstance) => {
  const createCategory = new CreateCategoryController();
  const updateCategory = new UpdateCategoryController();
  const checkAuthenticated = new CheckAuthtenticationMiddleware();

  fastify.route({
    url: "/category",
    method: "post",
    handler: createCategory.execute,
    preHandler: [checkAuthenticated.execute],
    schema: createCategorySchema,
  });

  fastify.route({
    url: "/category/:id",
    method: "put",
    handler: updateCategory.execute,
    preHandler: [checkAuthenticated.execute],
    schema: updateCategorySchema,
  });
};
