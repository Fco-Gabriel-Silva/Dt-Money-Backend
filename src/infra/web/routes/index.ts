import { FastifyInstance } from "fastify";
import * as AuthRoutes from "./auth.routes";
import * as TransactionRoutes from "./transaction.routes";
import * as CategoryRoutes from "./category.routes"; // <-- NOVO

export const register = (fasify: FastifyInstance) => {
  fasify.register((instance, _, done) => {
    AuthRoutes.configure(instance);
    TransactionRoutes.configure(instance);
    CategoryRoutes.configure(instance); // <-- NOVO
    done();
  });
};
