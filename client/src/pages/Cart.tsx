import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid2"
import Button from "@mui/material/Button"
import useProductStore from "../store/products-store"
import useUserStore from "../store/user-store"
import { ProductGriditem } from "../components"
import { Link, useNavigate } from "react-router"
import { useCallback } from "react"

const Cart = () => {
  console.log("cart rendered")

  const cartItemIDs = useUserStore(state => state.user.cart)
  const allProducts = useProductStore(state => state.products)
  const addToOrders = useUserStore(state => state.addToOrders)
  const removeFromCart = useUserStore(state => state.removeFromCart)
  const navigate = useNavigate()
  const cartItems = allProducts.filter(product =>
    cartItemIDs.includes(product.id)
  )

  const checkout = useCallback(() => {
    navigate("/checkout")
    addToOrders(cartItemIDs)
  }, [cartItemIDs])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}>
        {cartItems?.map(product => (
          <Grid key={product.id} size={{ xs: 2, sm: 4, md: 3 }}>
            <Link to={`/product/${product.id}`}>
              <ProductGriditem product={product} />
            </Link>
            <Button color="error" onClick={() => removeFromCart(product.id)}>
              remove
            </Button>
          </Grid>
        ))}
      </Grid>
      <Button onClick={checkout}>Checkout</Button>
    </Box>
  )
}

export default Cart
