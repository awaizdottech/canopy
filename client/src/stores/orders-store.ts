import { create } from "zustand"
import { devtools } from "zustand/middleware"

type UserStore = {
  orders: { id: number; quantity: number }[]
  addToOrders(products: { id: number; quantity: number }[]): void
  removeFromOrders(productsId: number): void
  emptyPlacedOrders(): void
}

const useOrdersStore = create<UserStore>()(
  devtools(set => ({
    orders: [],

    addToOrders: (products: { id: number; quantity: number }[]) =>
      set(
        state => ({
          orders: [...state.orders, ...products],
        }),
        false,
        "addToOrders"
      ),
    removeFromOrders: (productId: number) =>
      set(
        state => ({
          orders: state.orders.filter(order => order.id !== productId),
        }),
        false,
        "removeFromOrders"
      ),
    emptyPlacedOrders: () =>
      set(
        {
          orders: [],
        },
        false,
        "emptyPlacedOrders"
      ),
  }))
)

export default useOrdersStore
