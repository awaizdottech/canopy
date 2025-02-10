import { useParams } from "react-router"
import useProductStore from "../store/products-store"
import { ProductGriditem } from "../components"
import Button from "@mui/material/Button"
import useUserStore from "../store/user-store"
import { useCallback } from "react"

const ProductDetails = () => {
  console.log("product details rendered")
  const { id } = useParams()
  const product = useProductStore(
    state => state.products.filter(product => product.id == id)[0]
  )
  const addToCart = useUserStore(state => state.addToCart)
  const cart = useUserStore(state => state.user.cart)

  const handleAddToCart = useCallback(
    () => addToCart(product.id),
    [product, addToCart]
  )

  return (
    <>
      <ProductGriditem product={product} />
      <Button
        variant="contained"
        size="medium"
        onClick={handleAddToCart}
        disabled={cart.includes(product.id)}>
        {cart.includes(product.id) ? "Already in Cart" : "Add to Cart"}
      </Button>
    </>
  )
}

export default ProductDetails
