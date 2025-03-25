import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

type CartStore = {
  cart: { id: number; quantity: number }[]
  addToCart(productId: number, quantity: number): void
  removeFromCart(productId: number): void
}

const useCartStore = create<CartStore>()(
  devtools(
    persist(
      set => ({
        cart: [],
        addToCart: (productId: number, quantity: number) =>
          set(
            state => ({
              cart: [...state.cart, { id: productId, quantity }],
            }),
            false,
            "addToCart"
          ),
        removeFromCart: (productId: number) =>
          set(
            state => ({
              cart: state.cart.filter(product => product.id !== productId),
            }),
            false,
            "removeFromCart"
          ),
      }),
      {
        name: "canopyUserCart",
      }
    )
  )
)

export default useCartStore
