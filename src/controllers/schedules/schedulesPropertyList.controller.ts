import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import scheduleListPropertiesService from "../../services/schedules/schesdulesPropertyList.service";

const schedulesListController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const listed = await scheduleListPropertiesService(id);
    return res.status(200).send(listed);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};
export default schedulesListController;
