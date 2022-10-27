import { Schedule } from "./../../entities/schedule.entity";
import { Properties } from "../../entities/properties.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";

const scheduleListPropertiesService = async (id: string) => {
  const scheduleRepository = AppDataSource.getRepository(Schedule);

  const propertiesRepository = AppDataSource.getRepository(Properties);
  const propertiesList = await propertiesRepository.find();

  const validatedProperty = propertiesList.find(
    (property) => property.id === id
  );

  if (!validatedProperty) {
    throw new AppError(404, "Invalid property!");
  }

  const findSchedule = await scheduleRepository.find({
    where: {
      property: validatedProperty,
    },
  });

  if (!findSchedule) {
    throw new AppError(404, "Schedules not found");
  }
  return {
    schedules: findSchedule,
  };
};
export default scheduleListPropertiesService;
