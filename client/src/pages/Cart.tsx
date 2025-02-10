import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid2"
import useProductStore from "../store/products-store"
import useUserStore from "../store/user-store"
import { ProductGriditem } from "../components"

const Cart = () => {
  console.log("cart rendered")

  const cartItemIDs = useUserStore(state => state.user.cart)
  const cartItems = useProductStore(state => state.products)
  const ItemList = cartItems.filter(product => cartItemIDs.includes(product.id))

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}>
          {ItemList?.map(product => (
            <Grid key={product.id} size={{ xs: 2, sm: 4, md: 3 }}>
              <ProductGriditem product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}

export default Cart
