import { Properties } from "../../entities/properties.entity";
import AppDataSource from "../../data-source";

const propertyListService = async () => {
  const propertiesRepository = AppDataSource.getRepository(Properties);
  const properties = await propertiesRepository.find();

  return properties;
};
export default propertyListService;
