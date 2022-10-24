import { userUpdateSchema } from "./../middlewares/validateUpdateUser.middleware";
import { Router } from "express";
import userCreateController from "../controllers/userCreate.controller";
import userDeleteController from "../controllers/userDelete.controller";
import userListController from "../controllers/userList.controller";
import authUser from "../middlewares/authUser.middleware";
import authAdm from "../middlewares/authAdm.middleware";
import userUpdateController from "../controllers/userUpdate.controller";
import { validateUpdateUser } from "../middlewares/validateUpdateUser.middleware";
import authActive from "../middlewares/authActive.middleware";

export const userRoutes = Router();

userRoutes.post("", userCreateController);

userRoutes.get("", authUser, authAdm, userListController);

userRoutes.delete("/:id", authUser, authAdm, userDeleteController);

userRoutes.patch(
  "/:id",
  validateUpdateUser(userUpdateSchema),
  authUser,
  authActive,
  authAdm,
  userUpdateController
);
