import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import userDeleteService from "../../services/user/userDelete.service";
const userDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await userDeleteService(id, res);
    return res.status(204).send();
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default userDeleteController;
