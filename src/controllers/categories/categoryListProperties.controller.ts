import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import categoryListPropertiesService from "../../services/categories/categoryListProperties.service";

const categoriesListPropertiesController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const listed = await categoryListPropertiesService(id);
    return res.status(200).send(listed);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};
export default categoriesListPropertiesController;
