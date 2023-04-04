import { Product } from '../classes/product';

export const findUniqueProducts = (array: Array<Product>) => {
  const distinct = [];

  for (let i = 0; i < array.length; i++)
    if (
      !(distinct.filter((pr: Product) => pr.category.id === array[i].category.id).length > 4) &&
      !(distinct.filter((pr: Product) => pr.price === array[i].price).length > 1)
    )
      distinct.push(array[i]);

  return distinct;
};
