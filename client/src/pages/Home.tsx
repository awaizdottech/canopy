import { Box, Grid2 as Grid } from "@mui/material"
import { ProductGriditem } from "../components"
import useProductStore from "../store/products-store"
import { Link } from "react-router"
import { useEffect, useState } from "react"
import { getProducts } from "../services/products.services"

const Home = () => {
  console.log("home rendered")

  const [error, setError] = useState(null)
  const products = useProductStore(state => state.products)

  useEffect(() => {
    try {
      if ((products?.size ?? 0) < 30) getProducts()
    } catch (error: any) {
      setError(error)
    }
  }, [])

  if (error) return <>Something went wrong</>
  else if ((products?.size ?? 0) < 30) return <>Loading...</>
  else
    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}>
            {Array.from(products?.entries() ?? []).map(([id, product]) => (
              <Grid key={id} size={{ xs: 2, sm: 4, md: 3 }}>
                <Link to={`/product/${id}`}>
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
