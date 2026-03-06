import { FastifyInstance } from "fastify";
import { UpdateCategoryController } from "../controllers/category/update-category.controller";
import { DeleteUserController } from "../controllers/user/delete-user.controller";
import { CheckAuthtenticationMiddleware } from "../middlewares/check-authentication";
import { updateUserSchema } from "./schemas/user/update-user.schema";
import { deleteUserSchema } from "./schemas/user/delete-user.schema";

export const configure = (fastify: FastifyInstance) => {
  const updateUser = new UpdateCategoryController();
  const deleteUser = new DeleteUserController();
  const checkAuthenticated = new CheckAuthtenticationMiddleware();

  fastify.route({
    url: "/user/:id",
    method: "update",
    handler: updateUser.execute,
    preHandler: [checkAuthenticated.execute],
    schema: updateUserSchema,
  });

  fastify.route({
    url: "/user/:id",
    method: "delete",
    handler: deleteUser.execute,
    preHandler: [checkAuthenticated.execute],
    schema: deleteUserSchema,
  });
};
