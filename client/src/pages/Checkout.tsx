import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid2"
import Button from "@mui/material/Button"
import useProductStore from "../store/products-store"
import useUserStore from "../store/user-store"
import { ProductGriditem } from "../components"
import { useCallback } from "react"

const Checkout = () => {
  console.log("cart rendered")

  const { username, orders: orderItemIDs } = useUserStore(state => state.user)
  const allProducts = useProductStore(state => state.products)
  const orderItems = allProducts.filter(product =>
    orderItemIDs.includes(product.id)
  )

  const confirmOrder = useCallback(() => {
    try {
      if (localStorage.getItem("totalOrders")) {
        const totalOrders = JSON.parse(localStorage.getItem("totalOrders")!)
        orderItemIDs.forEach(orderId => {
          if (totalOrders[orderId]) totalOrders[orderId].push(username)
          else totalOrders[orderId] = [username]
        })
        localStorage.setItem("totalOrders", JSON.stringify(totalOrders))
      } else {
        const totalOrders: { [key: string]: string[] } = {}
        orderItemIDs.forEach(orderId => (totalOrders[orderId] = [username]))
        localStorage.setItem("totalOrders", JSON.stringify(totalOrders))
      }
      alert("order confirmed")
    } catch (error) {
      console.error("Error updating orders:", error)
      alert("Error updating orders:")
    }
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}>
        {orderItems?.map(product => (
          <Grid key={product.id} size={{ xs: 2, sm: 4, md: 3 }}>
            <ProductGriditem product={product} />
          </Grid>
        ))}
      </Grid>
      <Button onClick={confirmOrder}>Confirm Order</Button>
    </Box>
  )
}

export default Checkout
