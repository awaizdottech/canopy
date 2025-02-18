import { create } from "zustand"
import { devtools } from "zustand/middleware"

export type productType = {
  id: number
  images: string[]
  rating: number
  title: string
  availabilityStatus: string
  price: number
}

type userStoreType = {
  products: Map<number, productType>
  // addProducts(products: productType[]): void
  // addProduct(product: productType): void
}

const useProductStore = create<userStoreType>()(
  devtools(
    set => ({
      products: new Map<number, productType>(),
      // addProducts: (products: productType[]) =>
      //   set(() => ({ products: products }), false, "addProducts"),
      // addProduct: (product: productType) =>
      //   set(
      //     state => ({
      //       products: state.products
      //         ? [...state.products, product]
      //         : [product],
      //     }),
      //     false,
      //     "addProduct"
      //   ),
    }),
    { name: "products" }
  )
)

export default useProductStore
