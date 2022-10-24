import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const authActive = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.user.id;
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user = users.find((user) => user.id === id);
  if (user) {
    if (user.isActive !== true) {
      return res.status(401).json({ message: "Non-active user" });
    }
    next();
  }
};
export default authActive;
