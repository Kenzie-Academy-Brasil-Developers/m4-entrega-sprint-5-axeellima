import { IUserUpdate } from "./../../interfaces/users/index";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import bcrypt, { hash } from "bcrypt";
import { AppError } from "../../errors/appError";

const userUpdateService = async (
  id: string,
  { name, email, password }: IUserUpdate
) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user = users.find((user) => user.id === id);
  if (!user) {
    throw new AppError(404, "User not exists!");
  }
  if (password) {
    const users = await userRepository.find();
    const user = users.find((user) => user.id === id);
    if (bcrypt.compareSync(password, user!.password)) {
      throw new AppError(409, "Inform a different password");
    }
    const hashedPassword = await hash(password, 10);
    await userRepository.update(
      { id },
      { name, password: hashedPassword, email }
    );

    return {
      message: "Updated user",
      user: user,
    };
  }
  await userRepository.update({ id }, { name, email });

  const newUsers = await userRepository.find();
  const newUser = newUsers.find((user) => user.id === id);

  return {
    message: "Updated user",
    user: newUser,
  };
};

export default userUpdateService;
