import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import categoryListService from "../../services/categories/categoryListAll.service";

const categoriesListController = async (req: Request, res: Response) => {
  try {
    const listedCategories = await categoryListService();

    return res.status(200).send(listedCategories);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};
export default categoriesListController;
