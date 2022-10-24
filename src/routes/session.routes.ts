import { Router } from "express";
import userLoginController from "../controllers/users/userLogin.controller";

export const sessionRoutes = Router();

sessionRoutes.post("", userLoginController);
