import { IUserUpdate } from "./../interfaces/users/index";
import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";

export const userUpdateSchema: SchemaOf<IUserUpdate> = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  password: yup.string(),
});

export const validateUpdateUser =
  (schema: SchemaOf<IUserUpdate>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.updatedUser = validatedData;

        next();
      } catch (error: any) {
        return res.status(401).json({
          error: error.errors?.join(", "),
        });
      }
    } catch (error) {
      next(error);
    }
  };
