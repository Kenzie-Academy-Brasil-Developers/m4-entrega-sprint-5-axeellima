import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import userUpdateService from "../../services/user/userUpdate.service";
const userUpdateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.updatedUser;
    const updated = await userUpdateService(id, { name, email, password });
    return res.status(200).send(updated);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
    return res.status(401).send({ message: error });
  }
};

export default userUpdateController;
