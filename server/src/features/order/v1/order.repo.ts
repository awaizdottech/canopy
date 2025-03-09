import { db } from "../../.."

export const getAllOrders = async () => {
  try {
    db.many("select * from orders")
  } catch (error) {
    throw error
  }
}
