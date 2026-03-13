import { FastifySchema } from "fastify";
import S from "fluent-json-schema";

const params = S.object().prop("id", S.number().required());

const body = S.object()
  .prop("name", S.string())
  .prop("email", S.string())
  .prop("password", S.string())
  .prop("phone", S.string())
  .prop("avatarUrl", S.string());

export const updateUserSchema: FastifySchema = {
  tags: ["User"],
  params,
  body,
  security: [{ bearerAuth: [] }],
  response: {
    200: S.ref("User#"),
    400: { $ref: "BadRequest#" },
    401: { $ref: "Unauthorized#" },
    404: { $ref: "NotFound#" },
    500: { $ref: "ServerError#" },
  },
};
