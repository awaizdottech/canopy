import {
  Card,
  CardContent,
  CardMedia,
  Paper,
  styled,
  Typography,
} from "@mui/material"
import { productType } from "../../store/products-store"

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
  return (
    <Griditem>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={product.image}
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
  )
}

export default ProductGriditem
