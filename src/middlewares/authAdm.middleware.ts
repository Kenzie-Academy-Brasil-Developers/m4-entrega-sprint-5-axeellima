import { Request, Response, NextFunction } from "express";

const authAdm = async (req: Request, res: Response, next: NextFunction) => {
  const isAdm = req.user.isAdm;

  if (isAdm !== true) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
};
export default authAdm;
