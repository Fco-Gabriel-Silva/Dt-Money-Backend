import { FastifyInstance } from "fastify";
import { CreateCategoryController } from "../controllers/category/create-category.controller";
import { GetCategoryController } from "../controllers/category/get-category.controller";
import { UpdateCategoryController } from "../controllers/category/update-category.controller";
import { CheckAuthtenticationMiddleware } from "../middlewares/check-authentication";
import { createCategorySchema } from "./schemas/category/create-category.schema";
import { getCategorySchema } from "./schemas/category/get-category.schema";
import { updateCategorySchema } from "./schemas/category/update-category.schema";
import { DeleteCategoryController } from "../controllers/category/delete-category.controller";
import { deleteCategorySchema } from "./schemas/category/delete-category.schema";

export const configure = (fastify: FastifyInstance) => {
  const createCategory = new CreateCategoryController();
  const getCategories = new GetCategoryController();
  const updateCategory = new UpdateCategoryController();
  const deleteCategory = new DeleteCategoryController();
  const checkAuthenticated = new CheckAuthtenticationMiddleware();

  fastify.route({
    url: "/category",
    method: "post",
    handler: createCategory.execute,
    preHandler: [checkAuthenticated.execute],
    schema: createCategorySchema,
  });

  fastify.route({
    url: "/categories",
    method: "get",
    handler: getCategories.execute,
    preHandler: [checkAuthenticated.execute],
    schema: getCategorySchema,
  });

  fastify.route({
    url: "/category/:id",
    method: "put",
    handler: updateCategory.execute,
    preHandler: [checkAuthenticated.execute],
    schema: updateCategorySchema,
  });

  fastify.route({
    url: "/category/:id",
    method: "delete",
    handler: deleteCategory.execute,
    preHandler: [checkAuthenticated.execute],
    schema: deleteCategorySchema,
  });
};
