import { AppError } from "./errors/appError";
import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import "express-async-errors";
import express, { response } from "express";
import { userRoutes } from "./routes/user.routes";
import { sessionRoutes } from "./routes/session.routes";
import { propertiesRoutes } from "./routes/properties.routes";
import { categoriesRoutes } from "./routes/categories.routes";
import { schedulesRoutes } from "./routes/schedules.routes";

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", sessionRoutes);
app.use("/properties", propertiesRoutes);
app.use("/categories", categoriesRoutes);
app.use("/schedules", schedulesRoutes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

export default app;
