import scheduleCreateService from "../../services/schedules/schedulesCreate.service";
import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
const schedulesCreateController = async (req: Request, res: Response) => {
  try {
    const { userId, propertyId, date, hour } = req.body;
    const created = await scheduleCreateService({
      userId,
      propertyId,
      date,
      hour,
    });
    return res.status(201).send(created);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};
export default schedulesCreateController;
