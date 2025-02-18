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
  // loginUser(user: userType): void
  // logoutUser(): void
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
        // loginUser: (user: userType) =>
        //   set(
        //     {
        //       authStatus: true,
        //       user: user,
        //     },
        //     false,
        //     "loginUser"
        //   ),
        // logoutUser: () =>
        //   set(
        //     {
        //       authStatus: false,
        //       user: {
        //         username: "dummy",
        //         email: "dummy",
        //         mobile: "dummy",
        //         cart: [],
        //         tokens: {},
        //         orders: [],
        //         role: "customer",
        //       },
        //     },
        //     false,
        //     "logoutUser"
        //   ),
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
          tokens: state.user.tokens,
          cart: state.user.cart,
        }),
      }
    )
  )
)

export default useUserStore
