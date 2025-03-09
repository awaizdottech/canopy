import { getAllProducts, getManyProducts, getOneProduct } from "./product.repo"

export const getProducts = async (list?: number[]) => {
  try {
    if (list) {
      if (list.length == 1) return await getOneProduct(list[0])
      else return await getManyProducts(list)
    } else {
      return await getAllProducts()
    }
  } catch (error) {
    throw error
  }
}
