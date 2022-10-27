import { authUser } from "./../middlewares/authUser.middleware";
import { Router } from "express";
import schedulesCreateController from "../controllers/schedules/schedulesCreate.controller";
import authAdm from "../middlewares/authAdm.middleware";
import schedulesListController from "../controllers/schedules/schedulesPropertyList.controller";
import authActive from "../middlewares/authActive.middleware";

export const schedulesRoutes = Router();

schedulesRoutes.post("", authUser, schedulesCreateController);

schedulesRoutes.get(
  "/properties/:id",
  authUser,
  authActive,
  authAdm,
  schedulesListController
);
