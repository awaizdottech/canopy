import Box from "@mui/material/Box"
import useProductStore from "../store/products-store"
import { ProductGriditem } from "../components"

const AdminPortal = () => {
  console.log("admin portal ran")

  if (localStorage.getItem("totalOrders")) {
    const totalOrders = JSON.parse(localStorage.getItem("totalOrders")!)
    const allProducts = useProductStore(state => state.products)
    const orderedItems = allProducts.filter(product =>
      Object.keys(totalOrders).includes(String(product.id))
    )

    return (
      <>
        {orderedItems?.map(product => (
          <Box component="div" key={product.id}>
            <p>
              users:
              {totalOrders[product.id].map((user: string) => (
                <span> {user}</span>
              ))}
            </p>
            <p>count: {totalOrders[product.id].length}</p>
            <ProductGriditem product={product} />
          </Box>
        ))}
      </>
    )
  } else return <>no orders placed</>
}

export default AdminPortal
