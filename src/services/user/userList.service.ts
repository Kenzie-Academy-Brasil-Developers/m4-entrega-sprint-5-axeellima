import { User } from "./../../entities/user.entity";
import AppDataSource from "../../data-source";

const userListService = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const returnUsers = users.map((user) => {
    return {
      id: user.id,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      name: user.name,
      email: user.email,
      isAdm: user.isAdm,
    };
  });
  return returnUsers;
};
export default userListService;
