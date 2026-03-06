import { FastifyInstance } from "fastify";
import S from "fluent-json-schema";

export const configure = (fastify: FastifyInstance) => {
  const unprocessableEntityResponse = S.object()
    .id("UnprocessableEntity")
    .prop("message", S.string())
    .prop("errors", S.array().items(S.string()))
    .description("Erro de validação.");

  const badRequestResponse = S.object()
    .id("BadRequest")
    .prop("message", S.string())
    .description("Requisição mal formatada.");

  const businessErrorResponse = S.object()
    .id("BusinessError")
    .prop("message", S.string())
    .prop(
      "internalErrorCode",
      S.number().enum([1]).description("1 - Username already registered"),
    );

  const forbiddenResponse = S.object()
    .id("Forbidden")
    .prop("message", S.string());

  const notFoundErrorResponse = S.object()
    .id("NotFound")
    .prop("message", S.string());

  const unauthorizedErrorResponse = S.object()
    .id("Unauthorized")
    .prop("message", S.string());

  const errorResponse = S.object()
    .id("ServerError")
    .prop("message", S.string());

  const user = S.object()
    .id("User")
    .prop("id", S.number())
    .prop("name", S.string())
    .prop("email", S.string())
    .prop("phone", S.string())
    .prop("avatarUrl", S.string())
    .prop("createdAt", S.string())
    .prop("updatedAt", S.string())
    .prop("deletedAt", S.oneOf([S.string().format("date-time"), S.null()]));

  const type = S.object()
    .id("Type")
    .prop("id", S.number())
    .prop("name", S.string());

  const category = S.object()
    .id("Category")
    .prop("id", S.number())
    .prop("name", S.string())
    .prop("color", S.string())
    .prop("userId", S.anyOf([S.number(), S.null()]))
    .prop("createdAt", S.string())
    .prop("updatedAt", S.string())
    .prop("deletedAt", S.anyOf([S.string(), S.null()]));

  const totalTransactions = S.object()
    .id("TotalTransactions")
    .prop("revenue", S.number())
    .prop("expense", S.number())
    .prop("total", S.number());

  const transaction = S.object()
    .id("Transaction")
    .prop("id", S.number().required())
    .prop("value", S.number().required())
    .prop("description", S.anyOf([S.string(), S.null()]))
    .prop("categoryId", S.number().required())
    .prop("typeId", S.number().required())
    .prop("type", S.ref("Type#"))
    .prop("category", S.anyOf([S.ref("Category#"), S.null()]))
    .prop("createdAt", S.string())
    .prop("updatedAt", S.string())
    .prop("deletedAt", S.anyOf([S.string(), S.null()]));

  const orderDirection = S.string()
    .enum(["ASC", "asc", "DESC", "desc"])
    .id("OrderDirection");

  fastify.addSchema(type);
  fastify.addSchema(category);
  fastify.addSchema(transaction);
  fastify.addSchema(totalTransactions);
  fastify.addSchema(user);
  fastify.addSchema(orderDirection);
  fastify.addSchema(unprocessableEntityResponse);
  fastify.addSchema(businessErrorResponse);
  fastify.addSchema(forbiddenResponse);
  fastify.addSchema(notFoundErrorResponse);
  fastify.addSchema(unauthorizedErrorResponse);
  fastify.addSchema(errorResponse);
  fastify.addSchema(badRequestResponse);
};
