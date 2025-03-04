import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

type userType = {
  username: string
  email: string
  mobile: string
  tokens: {}
  cart: number[]
  orders: number[]
  role: "admin" | "customer"
}

type userStoreType = {
  user: userType
  authStatus: boolean
  logoutUser(): void
  addToCart(productId: number): void
  removeFromCart(productId: number): void
  addToOrders(products: number[]): void
  removeFromOrders(productsId: number): void
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
          tokens: {},
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
                tokens: {},
                orders: [],
                role: "customer",
              },
            },
            false,
            "logoutUser"
          ),
        addToCart: (productId: number) =>
          set(
            state => ({
              user: { ...state.user, cart: [...state.user.cart!, productId] },
            }),
            false,
            "addToCart"
          ),
        removeFromCart: (productId: number) =>
          set(
            state => ({
              user: {
                ...state.user,
                cart: state.user.cart.filter(id => id !== productId),
              },
            }),
            false,
            "removeFromCart"
          ),
        addToOrders: (products: number[]) =>
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
        removeFromOrders: (productId: number) =>
          set(
            state => ({
              user: {
                ...state.user,
                orders: state.user.orders.filter(id => id !== productId),
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
