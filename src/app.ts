import express from "express";
import swaggerUi from "swagger-ui-express";

import router from "./routes";
import { swaggerSpec } from "./docs/swagger";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(router);

app.use(errorMiddleware);

export default app;