import { create } from "zustand"
import { devtools } from "zustand/middleware"

export type productType = {
  id: number
  images: string[]
  rating: number
  title: string
  availabilityStatus: string
  price: number
  description: string
  category: string
  brand: string
  stock: number
}

type userStoreType = {
  products: Map<number, productType>
}

const useProductStore = create<userStoreType>()(
  devtools(
    () => ({
      products: new Map<number, productType>(),
    }),
    { name: "products" }
  )
)

export default useProductStore
