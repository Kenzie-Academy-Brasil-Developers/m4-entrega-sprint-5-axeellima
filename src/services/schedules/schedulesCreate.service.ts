import { User } from "./../../entities/user.entity";
import { IScheduleRequest } from "./../../interfaces/schedules/index";
import AppDataSource from "../../data-source";
import { Schedule } from "../../entities/schedule.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";

const scheduleCreateService = async ({
  userId,
  propertyId,
  date,
  hour,
}: IScheduleRequest) => {
  const newDate = new Date(date).getDay();
  if (newDate === 0 || newDate === 6) {
    throw new AppError(400, "Outside opening hours");
  }
  const newHour = new Date(date + " " + hour).getHours();
  if (newHour < 8 || newHour > 18) {
    throw new AppError(400, "Outside opening hours");
  }
  console.log(newDate);
  console.log(newHour);
  const scheduleRepository = AppDataSource.getRepository(Schedule);
  const scheduleList = await scheduleRepository.find();
  const validateSchedule = scheduleList.findIndex(
    (schedule) => schedule.date === date && schedule.hour === hour
  );
  if (validateSchedule !== -1) {
    throw new AppError(400, "appointment already made");
  }

  const userRepository = AppDataSource.getRepository(User);
  const userList = await userRepository.find();
  const validateUser = userList.find((user) => user.id === userId);

  if (!validateUser) {
    throw new AppError(404, "User not found");
  }

  const propertyRepository = AppDataSource.getRepository(Properties);
  const propertiesList = await propertyRepository.find();
  const validateProperty = propertiesList.find((property) => {
    return property.id === propertyId;
  });
  if (validateProperty === undefined) {
    throw new AppError(404, "Property not found");
  }

  const newSchedule = new Schedule();
  newSchedule.date = date;
  newSchedule.hour = hour;
  newSchedule.property = validateProperty;
  newSchedule.user = validateUser;

  scheduleRepository.create(newSchedule);
  await scheduleRepository.save(newSchedule);

  return {
    message: "Schedule created",
    schedule: {
      id: newSchedule.id,
      date: newSchedule.date,
      hour: newSchedule.hour,
    },
  };
};
export default scheduleCreateService;
