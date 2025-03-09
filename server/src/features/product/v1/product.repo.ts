import { db } from "../../.."
import { ApiError } from "../../../helpers/api-standards"

export const getAllProducts = async () => {
  try {
    return await db.many("select * from products;")
  } catch (error) {
    throw new ApiError(404, "failed to fetch products from DB")
  }
}

export const getOneProduct = async (id: number) => {
  try {
    return await db.one("select * from products where id=$1;", [id])
  } catch (error) {
    throw new ApiError(404, "failed to fetch product from DB")
  }
}

export const getManyProducts = async (list: number[]) => {
  try {
  } catch (error) {
    throw new ApiError(404, "failed to fetch products from DB")
  }
}
