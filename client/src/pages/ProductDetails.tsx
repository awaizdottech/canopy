import { useParams } from "react-router"
import useProductStore from "../store/products-store"
import { ProductGriditem } from "../components"
import Button from "@mui/material/Button"
import { useEffect, useState } from "react"
import { getProducts } from "../services/products.services"
import useUserStore from "../store/user-store"
import { Box } from "@mui/material"

const ProductDetails = () => {
  console.log("product details rendered")
  const { id } = useParams()
  const [error, setError] = useState(false)
  const product = useProductStore(state => state.products).get(
    Number(id) ?? null
  )
  const cartItemIDs = useUserStore(state => state.user.cart)
  const addToCart = useUserStore(state => state.addToCart)

  useEffect(() => {
    try {
      if (!product) getProducts(Number(id))
    } catch (error: any) {
      setError(error)
    }
  }, [])

  if (!product) return <>Loading...</>
  else if (error) return <>Something went wrong</>
  else
    return (
      <>
        <ProductGriditem product={product} />
        <Button
          variant="contained"
          size="medium"
          onClick={() => addToCart(product.id)}
          disabled={cartItemIDs.includes(product.id)}>
          {cartItemIDs.includes(product.id) ? "Already in Cart" : "Add to Cart"}
        </Button>
        <Box>
          <p>Category: {product.category}</p>
          <p>Brand: {product.brand}</p>
          <p>Stock: {product.stock}</p>
          <p>{product.description}</p>
        </Box>
      </>
    )
}

export default ProductDetails
