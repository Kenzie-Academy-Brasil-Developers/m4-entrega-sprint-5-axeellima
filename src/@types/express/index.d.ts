import { IUserUpdate } from "./../../interfaces/users/index";
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        isAdm: boolean;
      };
      updatedUser: IUserUpdate;
    }
  }
}
