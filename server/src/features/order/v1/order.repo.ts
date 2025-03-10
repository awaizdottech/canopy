import { db } from "../../.."
import { ApiError } from "../../../helpers/api-standards"
import { updateOrderType } from "./order.schemas"

export const getAllOrders = async () => {
  try {
    return await db.many("select * from orders;")
  } catch (error) {
    throw new ApiError(500, "failed to getAllOrders")
  }
}

export const updateOrderStatus = async (order: updateOrderType) => {
  try {
    return await db.one(
      "update orders set status=$2 where id=$1 returning *;",
      [order.id, order.status]
    )
  } catch (error) {
    throw new ApiError(500, "failed to updateOrder")
  }
}
