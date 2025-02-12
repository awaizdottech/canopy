import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { productType } from "../components/common/ProductGriditem"

type userStoreType = {
  products: productType[]
  addProducts(products: productType[]): void
}

const useProductStore = create<userStoreType>()(
  devtools(set => ({
    products: [],
    addProducts: (products: productType[]) =>
      set(() => ({ products: [...products] }), false, "addProducts"),
  }))
)

export default useProductStore
