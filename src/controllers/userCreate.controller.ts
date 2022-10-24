import { IUserRequest } from "./../interfaces/users/index";
import { Request, Response } from "express";
import userCreateService from "../services/user/userCreate.service";
const userCreateController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, isAdm } = req.body;

    const newUser = await userCreateService({ name, email, password, isAdm });
    return res.status(201).send(newUser);
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(400)
        .send({ error: error.name, message: error.message });
    }
  }
};
export default userCreateController;
