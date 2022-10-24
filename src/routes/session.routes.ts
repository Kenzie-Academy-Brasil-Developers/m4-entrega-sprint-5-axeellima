import { Router } from "express";
import userLoginController from "../controllers/userLogin.controller";

export const sessionRoutes = Router();

sessionRoutes.post("", userLoginController);
