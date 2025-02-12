import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid2"
import Button from "@mui/material/Button"
import useProductStore from "../store/products-store"
import useUserStore from "../store/user-store"
import { ProductGriditem } from "../components"
import { useCallback } from "react"
import { useNavigate } from "react-router"

const Checkout = () => {
  console.log("cart rendered")

  const { username, orders: orderItemIDs } = useUserStore(state => state.user)
  const removeFromOrders = useUserStore(state => state.removeFromOrders)
  const emptyPlacedOrders = useUserStore(state => state.emptyPlacedOrders)
  const allProducts = useProductStore(state => state.products)
  const navigate = useNavigate()
  const orderItems = allProducts.filter(product =>
    orderItemIDs.includes(product.id)
  )

  const confirmOrder = useCallback(() => {
    try {
      if (localStorage.getItem("allOrders")) {
        const allOrders = JSON.parse(localStorage.getItem("allOrders")!)
        orderItemIDs.forEach(orderId => {
          if (allOrders[orderId]) allOrders[orderId].push(username)
          else allOrders[orderId] = [username]
        })
        localStorage.setItem("allOrders", JSON.stringify(allOrders))
      } else {
        const allOrders: { [key: string]: string[] } = {}
        orderItemIDs.forEach(orderId => (allOrders[orderId] = [username]))
        localStorage.setItem("allOrders", JSON.stringify(allOrders))
      }
      alert("orders placed")
      emptyPlacedOrders()
      navigate("/")
    } catch (error) {
      console.error("Error updating orders:", error)
      alert("Error updating orders:")
    }
  }, [orderItemIDs, username])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}>
        {orderItems?.map(product => (
          <Grid key={product.id} size={{ xs: 2, sm: 4, md: 3 }}>
            <ProductGriditem product={product} />
            <Button color="error" onClick={() => removeFromOrders(product.id)}>
              remove
            </Button>
          </Grid>
        ))}
      </Grid>
      <Button onClick={confirmOrder}>Confirm Order</Button>
    </Box>
  )
}

export default Checkout
