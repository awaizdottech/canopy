import { Box, Grid2 as Grid } from "@mui/material"
import { ProductGriditem } from "../components"
import useProductStore from "../store/products-store"
import { Link } from "react-router"

const Home = () => {
  console.log("home rendered")

  const products = useProductStore(state => state.products)

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}>
          {products?.map(product => (
            <Grid key={product.id} size={{ xs: 2, sm: 4, md: 3 }}>
              <Link to={`/product/${product.id}`}>
                <ProductGriditem product={product} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}

export default Home
