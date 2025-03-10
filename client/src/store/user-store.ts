import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

type userType = {
  username: string
  email: string
  mobile: string
  refreshToken: string
  cart: { id: string; quantity: number }[]
  orders: { id: string; quantity: number }[]
  role: "admin" | "customer"
}

type userStoreType = {
  user: userType
  authStatus: boolean
  logoutUser(): void
  addToCart(productId: string, quantity: number): void
  removeFromCart(productId: string): void
  addToOrders(products: { id: string; quantity: number }[]): void
  removeFromOrders(productsId: string): void
  emptyPlacedOrders(): void
}

const useUserStore = create<userStoreType>()(
  devtools(
    persist(
      set => ({
        user: {
          username: "dummy",
          email: "dummy",
          mobile: "dummy",
          cart: [],
          refreshToken: "",
          orders: [],
          role: "customer",
        },
        authStatus: false,
        logoutUser: () =>
          set(
            {
              authStatus: false,
              user: {
                username: "dummy",
                email: "dummy",
                mobile: "dummy",
                cart: [],
                refreshToken: "",
                orders: [],
                role: "customer",
              },
            },
            false,
            "logoutUser"
          ),
        addToCart: (productId: string, quantity: number) =>
          set(
            state => ({
              user: {
                ...state.user,
                cart: [...state.user.cart!, { id: productId, quantity }],
              },
            }),
            false,
            "addToCart"
          ),
        removeFromCart: (productId: string) =>
          set(
            state => ({
              user: {
                ...state.user,
                cart: state.user.cart.filter(
                  product => product.id !== productId
                ),
              },
            }),
            false,
            "removeFromCart"
          ),
        addToOrders: (products: { id: string; quantity: number }[]) =>
          set(
            state => ({
              user: {
                ...state.user,
                orders: [...state.user.orders, ...products],
              },
            }),
            false,
            "addToOrders"
          ),
        removeFromOrders: (productId: string) =>
          set(
            state => ({
              user: {
                ...state.user,
                orders: state.user.orders.filter(
                  order => order.id !== productId
                ),
              },
            }),
            false,
            "removeFromOrders"
          ),
        emptyPlacedOrders: () =>
          set(
            state => ({
              user: {
                ...state.user,
                orders: [],
              },
            }),
            false,
            "emptyPlacedOrders"
          ),
      }),
      {
        name: "canopyUser",
        partialize: state => ({
          cart: state.user.cart,
        }),
      }
    )
  )
)

export default useUserStore
