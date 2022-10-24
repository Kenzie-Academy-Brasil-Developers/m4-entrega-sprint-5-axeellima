import { Router } from "express";
import categoryCreateController from "../controllers/categories/categoryCreate.controller";
import categoriesListController from "../controllers/categories/categoryListAll.controller";
import categoriesListPropertiesController from "../controllers/categories/categoryListProperties.controller";
import authAdm from "../middlewares/authAdm.middleware";
import authUser from "../middlewares/authUser.middleware";

export const categoriesRoutes = Router();

categoriesRoutes.post("", authUser, authAdm, categoryCreateController);

categoriesRoutes.get("", categoriesListController);

categoriesRoutes.get("/:id/properties", categoriesListPropertiesController);
