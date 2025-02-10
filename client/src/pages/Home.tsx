import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid2"
import { ProductGriditem } from "../components"
import useProductStore from "../store/products-store"

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
              <ProductGriditem product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}

export default Home
