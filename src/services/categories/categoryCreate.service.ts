import { Categories } from "./../../entities/categories.entity";
import AppDataSource from "../../data-source";
import { ICategoryRequest } from "../../interfaces/categories";
import { AppError } from "../../errors/appError";

const categoryCreateService = async ({ name }: ICategoryRequest) => {
  const categoriesRepository = AppDataSource.getRepository(Categories);
  const categoryList = await categoriesRepository.find();

  const categoryAlreadyExists = categoryList.find(
    (category) => category.name === name
  );

  if (categoryAlreadyExists) {
    throw new AppError(400, "Category already exists!");
  }

  const newCategory = new Categories();
  newCategory.id = newCategory.id;
  newCategory.name = name;
  categoriesRepository.create(newCategory);
  await categoriesRepository.save(newCategory);

  return newCategory;
};
export default categoryCreateService;
