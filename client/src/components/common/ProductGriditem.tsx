import { styled } from "@mui/material/styles"
import Paper from "@mui/material/Paper"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { Link } from "react-router"

export type productType = {
  id: string
  images: string[]
  rating: number
  title: string
  availabilityStatus: string
  price: number
}

const Griditem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}))

const ProductGriditem = ({ product }: { product: productType }) => {
  console.log("product grid item rendered")

  return (
    <Link to={`/product/${product.id}`}>
      <Griditem>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={product.images[0]}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Rating: {product.rating}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {product.availabilityStatus}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Price: ${product.price}
            </Typography>
          </CardContent>
        </Card>
      </Griditem>
    </Link>
  )
}

export default ProductGriditem
