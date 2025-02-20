import Box from "@mui/material/Box"
import { ProductGriditem } from "../components"
import { getOrderedItems } from "../services/user.services"

const AdminPortal = () => {
  console.log("admin portal ran")

  const { orderedItems, allOrders } = getOrderedItems()

  return (
    <>
      {orderedItems.map(product =>
        product ? (
          <Box component="div" key={product.id}>
            <p>
              users:
              {allOrders[product.id].map((user: string) => (
                <span> {user}</span>
              ))}
            </p>
            <p>count: {allOrders[product.id].length}</p>
            <ProductGriditem product={product} />
          </Box>
        ) : null
      )}
    </>
  )
}

export default AdminPortal
