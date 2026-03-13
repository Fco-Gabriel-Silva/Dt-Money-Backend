import { FastifyInstance } from "fastify";
import multipart from "@fastify/multipart";

export const register = async (fastify: FastifyInstance) => {
  await fastify.register(multipart);
};
