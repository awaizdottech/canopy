import Badge from "@mui/material/Badge"
import IconButton from "@mui/material/IconButton"
import { Link } from "react-router"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import useCartStore from "../../stores/cart-store"

const CartIcon = () => {
  const cart = useCartStore(state => state.cart)

  return (
    <Link to="/cart">
      <IconButton size="large" aria-label="show cart">
        <Badge badgeContent={cart.length} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Link>
  )
}

export default CartIcon
