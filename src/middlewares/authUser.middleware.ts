import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(
      token as string,
      process.env.SECRET_KEY as string,
      (err: any, decoded: any) => {
        req.user = {
          id: decoded.id,
          isAdm: decoded.isAdm,
        };
        next();
      }
    );
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
export default authUser;
