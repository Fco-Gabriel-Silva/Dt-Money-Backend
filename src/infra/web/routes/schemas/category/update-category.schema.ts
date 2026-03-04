import { FastifySchema } from "fastify";
import S from "fluent-json-schema";

const params = S.object().prop("id", S.number().required());

const body = S.object().prop("name", S.string()).prop("color", S.string());

export const updateCategorySchema: FastifySchema = {
  tags: ["Category"],
  params,
  body,
  security: [{ bearerAuth: [] }],
  response: {
    200: S.ref("Category#"),
    400: { $ref: "BadRequest#" },
    401: { $ref: "Unauthorized#" },
    404: { $ref: "NotFound#" },
    500: { $ref: "ServerError#" },
  },
};
