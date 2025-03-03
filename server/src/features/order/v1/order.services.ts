import { getAllOrders } from "./order.repo"

export const getOrders = async () => {
  try {
    getAllOrders()
  } catch (error) {
    throw error
  }
}
