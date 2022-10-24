import propertyCreateService from "../../services/properties/propertyCreate.service";
import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";

const propertyCreateController = async (req: Request, res: Response) => {
  try {
    const { value, size, address, categoryId } = req.body;

    const newProperty = await propertyCreateService({
      value,
      size,
      address,
      categoryId,
    });
    return res.status(201).send(newProperty);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};
export default propertyCreateController;
