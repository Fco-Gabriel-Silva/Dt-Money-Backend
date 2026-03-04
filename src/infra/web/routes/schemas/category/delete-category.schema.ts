import { FastifySchema } from "fastify";
import S from "fluent-json-schema";

const params = S.object().prop("id", S.number().required());

export const deleteCategorySchema: FastifySchema = {
  tags: ["Category"],
  params,
  security: [{ bearerAuth: [] }],
  response: {
    204: { type: "null" },
    400: { $ref: "BadRequest#" },
    401: { $ref: "Unauthorized#" },
    422: { $ref: "UnprocessableEntity#" },
    500: { $ref: "ServerError#" },
  },
};
