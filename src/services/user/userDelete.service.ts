import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { Response } from "express";

const userDeleteService = async (id: string, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const user = users.find((user) => user.id === id);
  if (user) {
    if (user.isActive === false) {
      throw new Error("Non-active user");
    }
    await userRepository
      .update({ id }, { isActive: false })
      .then((response) => response.raw[0]);

    return;
  } else {
    return res.status(404).send({ message: "User not found" });
  }
};
export default userDeleteService;
