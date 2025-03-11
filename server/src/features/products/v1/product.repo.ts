import { db } from "../../.."
import { ApiError } from "../../../helpers/api-standards"

export const getAllProducts = async () => {
  try {
    return await db.many("select * from products;")
  } catch (error) {
    throw new ApiError(500, "failed to fetch products from DB")
  }
}

export const getOneProduct = async (id: string) => {
  try {
    return await db.one("select * from products where id=$1;", [id])
  } catch (error) {
    throw new ApiError(500, "failed to fetch product from DB")
  }
}

export const getManyProducts = async (list: string[]) => {
  try {
    return await db.many("select * from products where id=any($1);", [...list])
  } catch (error) {
    throw new ApiError(500, "failed to fetch products from DB")
  }
}
