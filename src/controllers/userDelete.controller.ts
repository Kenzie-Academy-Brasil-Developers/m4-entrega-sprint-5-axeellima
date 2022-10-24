import { Request, Response } from "express";
import userDeleteService from "../services/user/userDelete.service";
const userDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await userDeleteService(id, res);
    return res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(400)
        .send({ error: error.name, message: error.message });
    }
  }
};

export default userDeleteController;
