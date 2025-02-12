import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

type userType = {
  username: string
  email: string
  mobile: string
  tokens: {}
  cart: string[]
  orders: string[]
  role: "admin" | "customer"
}

type userStoreType = {
  user: userType
  authStatus: boolean
  loginUser(user: userType): void
  logoutUser(): void
  addToCart(productId: string): void
  addToOrders(products: string[]): void
}

const useUserStore = create<userStoreType>()(
  devtools(
    persist(
      set => ({
        user: {
          username: "",
          email: "",
          mobile: "",
          tokens: {},
          cart: [],
          orders: [],
          role: "customer",
        },
        authStatus: false,
        loginUser: (user: userType) =>
          set(
            state => ({
              authStatus: true,
              user: { ...state.user, ...user },
            }),
            false,
            "loginUser"
          ),
        logoutUser: () =>
          set(
            state => ({
              authStatus: false,
              user: { ...state.user, cart: [], orders: [] },
            }),
            false,
            "logoutUser"
          ),
        addToCart: (productId: string) =>
          set(
            state => ({
              user: { ...state.user, cart: [...state.user.cart!, productId] },
            }),
            false,
            "addToCart"
          ),
        addToOrders: (products: string[]) =>
          set(
            state => ({
              user: {
                ...state.user,
                orders: [...state.user.orders!, ...products],
              },
            }),
            false,
            "addToOrders"
          ),
      }),
      {
        name: "canopyUser",
        partialize: state => ({ tokens: state.user.tokens }),
      }
    )
  )
)

export default useUserStore
