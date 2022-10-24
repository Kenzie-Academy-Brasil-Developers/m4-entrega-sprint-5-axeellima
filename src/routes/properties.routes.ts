import { authUser } from "./../middlewares/authUser.middleware";
import { Router } from "express";
import propertyCreateController from "../controllers/properties/propertyCreate.controller";
import propertyListController from "../controllers/properties/propertyList.controller";
import authAdm from "../middlewares/authAdm.middleware";

export const propertiesRoutes = Router();

propertiesRoutes.post("", authUser, authAdm, propertyCreateController);

propertiesRoutes.get("", propertyListController);
