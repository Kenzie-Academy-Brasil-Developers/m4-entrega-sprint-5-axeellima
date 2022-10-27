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
  const propertyRepository = AppDataSource.getRepository(Properties);
  const validateProperty = await propertyRepository.findOne({
    where: {
      id: propertyId,
    },
  });

  if (!validateProperty) {
    throw new AppError(404, "Property not found");
  }

  const newDate = new Date(date);
  const getDate = newDate.getDay();
  if (getDate === 0 || getDate === 6) {
    throw new AppError(400, "Outside opening hours");
  }
  const newHour = new Date(date + " " + hour).getHours();
  if (newHour < 8 || newHour >= 18) {
    throw new AppError(400, "Outside opening hours");
  }
  const scheduleRepository = AppDataSource.getRepository(Schedule);
  const scheduleList = await scheduleRepository.find();
  const validateSchedule = scheduleList.find(
    (schedule) =>
      schedule.date === newDate.toLocaleDateString() && schedule.hour === hour
  );
  if (validateSchedule) {
    throw new AppError(400, "appointment already made");
  }

  const userRepository = AppDataSource.getRepository(User);
  const userList = await userRepository.find();
  const validateUser = userList.find((user) => user.id === userId);

  if (!validateUser) {
    throw new AppError(404, "User not found");
  }

  const newSchedule = new Schedule();
  newSchedule.date = newDate.toLocaleDateString();
  newSchedule.hour = hour;
  newSchedule.property = validateProperty;
  newSchedule.user = validateUser;

  scheduleRepository.create(newSchedule);
  await scheduleRepository.save(newSchedule);

  return {
    message: "Schedule created",
    schedule: newSchedule,
  };
};
export default scheduleCreateService;
