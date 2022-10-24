import { Categories } from "../../entities/categories.entity";
import AppDataSource from "../../data-source";

const categoryListService = async () => {
  const categoriesRepository = AppDataSource.getRepository(Categories);
  const categoryList = await categoriesRepository.find();

  return categoryList;
};
export default categoryListService;
