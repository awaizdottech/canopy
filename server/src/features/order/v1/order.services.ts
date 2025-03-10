import { getAllOrders, updateOrderStatus } from "./order.repo"
import { updateOrderType } from "./order.schemas"

export const getAllOrdersService = async () => {
  try {
    return await getAllOrders()
  } catch (error) {
    throw error
  }
}

export const updateOrderService = async (order: updateOrderType) => {
  try {
    return await updateOrderStatus(order)
  } catch (error) {
    throw error
  }
}
