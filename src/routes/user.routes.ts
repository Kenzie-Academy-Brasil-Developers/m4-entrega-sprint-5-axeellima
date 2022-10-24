import { userUpdateSchema } from "./../middlewares/validateUpdateUser.middleware";
import { Router } from "express";
import userCreateController from "../controllers/users/userCreate.controller";
import userDeleteController from "../controllers/users/userDelete.controller";
import userListController from "../controllers/users/userList.controller";
import authUser from "../middlewares/authUser.middleware";
import authAdm from "../middlewares/authAdm.middleware";
import userUpdateController from "../controllers/users/userUpdate.controller";
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
