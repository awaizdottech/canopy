import restApi from "../helpers/rest-api"
import useProductStore, { productType } from "../stores/products-store"

export const getProducts = async (id?: number) => {
  try {
    if (id) {
      const response = await restApi(`/products/${id}`)
      useProductStore.setState(
        state => ({
          products: state.products?.size
            ? state.products.set(response.data.id, response.data)
            : new Map<number, productType>([[response.data.id, response.data]]),
        }),
        false,
        "addProduct"
      )
      return response.data
    } else {
      const response = await restApi("/products")
      useProductStore.setState(
        state => ({
          products: state.products?.size
            ? new Map<number, productType>([
                ...state.products,
                ...response.data.data.map((product: productType) => [
                  product.id,
                  product,
                ]),
              ])
            : new Map<number, productType>(
                response.data.data.map((product: productType) => [
                  product.id,
                  product,
                ])
              ),
        }),
        false,
        "addProducts"
      )
    }
  } catch (error: any) {
    throw error
  }
}
