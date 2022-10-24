import propertyListService from "../../services/properties/propertyList.service";
import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";

const propertyListController = async (req: Request, res: Response) => {
  try {
    const listedProperties = await propertyListService();

    return res.status(200).send(listedProperties);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};
export default propertyListController;
