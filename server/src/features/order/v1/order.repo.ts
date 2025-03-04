import { db } from "../../.."

export const getAllOrders = async () => {
  try {
    db.manyOrNone("select * from orders")
  } catch (error) {
    throw error
  }
}
