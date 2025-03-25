import { useParams } from "react-router"
import useProductStore from "../../stores/products-store"
import { ProductGriditem } from ".."
import Button from "@mui/material/Button"
import { useEffect, useState } from "react"
import { getProducts } from "../../services/products.services"
import { Box } from "@mui/material"
import { isProductInCart } from "../../services/user.services"
import useCartStore from "../../stores/cart-store"

const ProductDetails = () => {
  console.log("product details rendered")
  const { id } = useParams()
  const [error, setError] = useState(false)
  if (!id) setError(true)
  const product = useProductStore(state => state.products).get(Number(id!))
  const addToCart = useCartStore(state => state.addToCart)
  const cart = useCartStore(state => state.cart)
  const check = isProductInCart(product!.id, cart)

  useEffect(() => {
    try {
      if (!product) getProducts(id)
    } catch (error: any) {
      setError(error)
    }
  }, [])

  if (error) return <>Something went wrong</>
  else if (!product) return <>Loading...</>
  else
    return (
      <Box sx={{ flexGrow: 1 }}>
        <ProductGriditem product={product} />
        <Button
          variant="contained"
          size="medium"
          onClick={() => addToCart(product.id, 1)}
          disabled={check}>
          {check ? "Already in Cart" : "Add to Cart"}
        </Button>
        <Box>
          <p>Category: {product.category}</p>
          <p>Brand: {product.brand}</p>
          <p>Stock: {product.stock}</p>
          <p>{product.description}</p>
        </Box>
      </Box>
    )
}

export default ProductDetails
