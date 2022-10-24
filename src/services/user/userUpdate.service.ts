import { IUserUpdate } from "./../../interfaces/users/index";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { hash } from "bcrypt";

const userUpdateService = async (
  id: string,
  { name, email, password }: IUserUpdate
) => {
  const userRepository = AppDataSource.getRepository(User);
  if (password) {
    const hashedPassword = await hash(password, 10);
    await userRepository.update(
      { id },
      { name, password: hashedPassword, email }
    );

    const users = await userRepository.find();
    const user = users.find((user) => user.id === id);
    return {
      message: "Updated user",
      user: user,
    };
  }
  await userRepository.update({ id }, { name, email });

  const users = await userRepository.find();
  const user = users.find((user) => user.id === id);

  return {
    message: "Updated user",
    user: user,
  };
};

export default userUpdateService;
