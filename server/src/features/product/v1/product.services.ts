import { getAllProducts, getManyProducts, getOneProduct } from "./product.repo"

export const getProducts = async (list?: number[]) => {
  try {
    if (list) {
      if (list.length == 1) return getOneProduct(list[0])
      else return getManyProducts(list)
    } else {
      return getAllProducts()
    }
  } catch (error) {
    throw error
  }
}
