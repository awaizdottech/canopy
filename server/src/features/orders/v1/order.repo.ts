import { db } from "../../../db/db"
import { ApiError } from "../../../helpers/api-generics.helpers"
import { updateOrderType } from "./order.schemas"
//TODO: define returning types for all functions here properly

export const getAllOrders = async () => {
  try {
    return await db.manyOrNone("select * from orders;")
  } catch (error) {
    // throw new ApiError(500, "failed to getAllOrders")
  }
}

export const updateOrderStatus = async (order: updateOrderType) => {
  try {
    return await db.one(
      "update orders set status=$2 where id=$1 returning *;",
      [order.id, order.status]
    )
  } catch (error) {
    // throw new ApiError(500, "failed to updateOrder")
  }
}
