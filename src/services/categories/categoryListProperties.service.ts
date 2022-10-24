import { Properties } from "../../entities/properties.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import propertyCreateController from "../../controllers/properties/propertyCreate.controller";
import { Categories } from "../../entities/categories.entity";

const categoryListPropertiesService = async (id: string) => {
  const propertiesRepository = AppDataSource.getRepository(Properties);
  const categoriesRepository = AppDataSource.getRepository(Categories);
  const propertiesList = await propertiesRepository.find();
  const categoriesList = await categoriesRepository.find();

  const validatedCategory = categoriesList.findIndex(
    (category) => category.id === id
  );

  if (validatedCategory === -1) {
    throw new AppError(404, "Invalid category!");
  }
  let name = null;

  const filterProperties = propertiesList.filter((property) => {
    if (property.category.id === id) {
      name = property.category.name;

      return property.category.id === id;
    }
  });

  return {
    id: id,
    name: name,
    message: "Listed properties",
    properties: filterProperties,
  };
};
export default categoryListPropertiesService;
