import { IUserRequest, IUser } from "./../../interfaces/users/index";
import { User } from "../../entities/user.entity";
import { hash } from "bcrypt";
import AppDataSource from "../../data-source";
const userCreateService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const hashedPassword = await hash(password, 10);

  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {
    throw new Error("Email already exists!");
  }

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = hashedPassword;
  user.isAdm = isAdm;

  userRepository.create(user);
  await userRepository.save(user);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isAdm: user.isAdm,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
export default userCreateService;
