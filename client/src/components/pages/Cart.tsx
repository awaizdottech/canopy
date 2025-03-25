import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid2"
import Button from "@mui/material/Button"
import { ProductGriditem } from ".."
import { Link, useNavigate } from "react-router"
import { useCallback } from "react"
import { getCartItems, getCartItemsTotal } from "../../services/user.services"
import { productType } from "../../stores/products-store"
import useOrdersStore from "../../stores/orders-store"
import useCartStore from "../../stores/cart-store"

const Cart = () => {
  console.log("cart rendered")
  const addToOrders = useOrdersStore(state => state.addToOrders)
  const removeFromCart = useCartStore(state => state.removeFromCart)
  const navigate = useNavigate()
  const cart = useCartStore(state => state.cart)
  const cartItems = getCartItems(cart)
  const cartTotal = getCartItemsTotal(
    cartItems?.filter((item): item is productType => item !== undefined) ?? []
  )
  console.log("cart", cart)

  const checkout = useCallback(() => {
    navigate("/checkout")
    addToOrders(cart)
  }, [cart])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}>
        {cartItems.map(product =>
          product ? (
            <Grid key={product.id} size={{ xs: 2, sm: 4, md: 3 }}>
              <Link to={`/product/${product.id}`}>
                <ProductGriditem product={product} />
              </Link>
              <Button color="error" onClick={() => removeFromCart(product.id)}>
                remove
              </Button>
            </Grid>
          ) : null
        )}
      </Grid>
      <Box>Total: ${cartTotal}</Box>
      <Button onClick={checkout}>Checkout</Button>
    </Box>
  )
}

export default Cart
