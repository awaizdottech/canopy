import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid2"
import Button from "@mui/material/Button"
import useUserStore from "../store/user-store"
import { ProductGriditem } from "../components"
import { useCallback } from "react"
import { confirmOrder, getOrderItems } from "../services/user.services"

const Checkout = () => {
  console.log("cart rendered")
  const { username, orders: orderItemsIDs } = useUserStore(state => state.user)
  const removeFromOrders = useUserStore(state => state.removeFromOrders)
  const orderItems = getOrderItems(orderItemsIDs)

  const handleConfirmOrder = useCallback(() => {
    confirmOrder(orderItemsIDs, username)
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}>
        {orderItems?.map(product =>
          product ? (
            <Grid key={product.id} size={{ xs: 2, sm: 4, md: 3 }}>
              <ProductGriditem product={product} />
              <Button
                color="error"
                onClick={() => removeFromOrders(product.id)}>
                remove
              </Button>
            </Grid>
          ) : null
        )}
      </Grid>
      <Button onClick={handleConfirmOrder}>Confirm Order</Button>
    </Box>
  )
}

export default Checkout
