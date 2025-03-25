import Box from "@mui/material/Box"
import { ProductGriditem } from ".."
import { getOrderedItems } from "../../services/user.services"
import { useEffect, useState } from "react"

const AdminPortal = () => {
  console.log("admin portal ran")
  const [orders, setOrders] = useState<any>([])

  useEffect(() => {
    ;(async () => {
      const orders = await getOrderedItems()
      setOrders(orders)
    })()
  }, [])

  return (
    <>
      {/* {orderedItems.map(product =>
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
      )} */}
    </>
  )
}

export default AdminPortal
