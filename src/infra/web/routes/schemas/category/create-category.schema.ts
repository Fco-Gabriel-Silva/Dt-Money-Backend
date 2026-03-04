import { FastifySchema } from "fastify";
import S from "fluent-json-schema";

const body = S.object()
  .prop("name", S.string().required())
  .prop("color", S.string().required());

export const createCategorySchema: FastifySchema = {
  tags: ["Category"],
  body,
  security: [{ bearerAuth: [] }],
  response: {
    201: S.ref("Category#"),
    401: { $ref: "Unauthorized#" },
    422: { $ref: "UnprocessableEntity#" },
    500: { $ref: "ServerError#" },
  },
};
