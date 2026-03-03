import { FastifySchema } from "fastify";
import S from "fluent-json-schema";

export const getCategorySchema: FastifySchema = {
  tags: ["Category"],
  security: [{ bearerAuth: [] }],
  response: {
    200: S.array().items(S.ref("Category#")),
    401: { $ref: "Unauthorized#" },
    500: { $ref: "ServerError#" },
  },
};
