import { Properties } from "../../entities/properties.entity";
import { Address } from "../../entities/addresses.entity";
import AppDataSource from "../../data-source";
import { IAddressRequest, IPropertyRequest } from "../../interfaces/properties";
import { AppError } from "../../errors/appError";
import { Categories } from "../../entities/categories.entity";

const propertyCreateService = async ({
  value,
  size,
  address,
  categoryId,
}: IPropertyRequest) => {
  const { district, zipCode, number, city, state }: IAddressRequest = address;

  const categoryRepository = AppDataSource.getRepository(Categories);
  const categoriesList = await categoryRepository.find();

  const propertiesRepository = AppDataSource.getRepository(Properties);
  const addressRepository = AppDataSource.getRepository(Address);

  const listAdress = await addressRepository.find();

  const validCategory = categoriesList.findIndex(
    (atual) => atual.id === categoryId
  );

  if (validCategory === -1) {
    throw new AppError(404, "Invalid category");
  }
  const propertyHaveTheSameAddress = listAdress.find(
    (address) =>
      address.city === city &&
      address.state === state &&
      address.zipCode === zipCode &&
      address.number === number
  );
  if (state.split("").length > 2) {
    throw new AppError(400, "State length is than longer than the permitted");
  }
  if (zipCode.split("").length > 8) {
    throw new AppError(400, "ZipCode length is than longer than the permitted");
  }
  if (propertyHaveTheSameAddress) {
    throw new AppError(400, "Already exists a property with this address");
  }
  const newAddress = new Address();
  newAddress.district = district;
  newAddress.zipCode = zipCode;
  if (number) {
    newAddress.number = number;
  }
  newAddress.city = city;
  newAddress.state = state;

  addressRepository.create(newAddress);
  await addressRepository.save(newAddress);

  const propertyCategory = categoriesList.find(
    (category) => category.id === categoryId
  );
  if (!propertyCategory) {
    throw new AppError(404, "Category not found");
  }
  const newProperty = new Properties();
  newProperty.id = newProperty.id;
  newProperty.value = value;
  newProperty.size = size;
  newProperty.address = newAddress;
  newProperty.category = propertyCategory;

  propertiesRepository.create(newProperty);
  await propertiesRepository.save(newProperty);

  return newProperty;
};
export default propertyCreateService;
