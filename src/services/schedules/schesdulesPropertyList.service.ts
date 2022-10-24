import { Properties } from "../../entities/properties.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import propertyCreateController from "../../controllers/properties/propertyCreate.controller";
import { Categories } from "../../entities/categories.entity";
import { Schedule } from "../../entities/schedule.entity";

const scheduleListPropertiesService = async (id: string) => {
  const scheduleRepository = AppDataSource.getRepository(Schedule);
  const scheduleList = await scheduleRepository.find();

  const propertiesRepository = AppDataSource.getRepository(Properties);
  const propertiesList = await propertiesRepository.find();

  const validatedProperty = propertiesList.findIndex(
    (property) => property.id === id
  );

  if (validatedProperty === -1) {
    throw new AppError(404, "Invalid property!");
  }
  let addressSchedule = null;

  const filteredSchedule = scheduleList.map((schedule) => {
    if (schedule.property.id === id) {
      addressSchedule = schedule.property.address;
      return {
        date: schedule.date,
        hour: schedule.hour,
        id: schedule.id,
      };
    }
  });

  if (filteredSchedule.length === 0) {
    throw new AppError(404, "Schedules not found");
  }

  return {
    address: addressSchedule,
    schedules: filteredSchedule,
  };
};
export default scheduleListPropertiesService;
