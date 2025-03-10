import { useParams } from "react-router"
import useProductStore from "../store/products-store"
import { ProductGriditem } from "../components"
import Button from "@mui/material/Button"
import { useEffect, useState } from "react"
import { getProducts } from "../services/products.services"
import useUserStore from "../store/user-store"
import { Box } from "@mui/material"
import { isProductInCart } from "../services/user.services"

const ProductDetails = () => {
  console.log("product details rendered")
  const { id } = useParams()
  const [error, setError] = useState(false)
  if (!id) setError(true)
  const product = useProductStore(state => state.products).get(Number(id!))
  const addToCart = useUserStore(state => state.addToCart)
  const cart = useUserStore(state => state.user.cart)
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
