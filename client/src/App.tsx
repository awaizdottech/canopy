import { Outlet } from "react-router"
import "./App.css"
import { Footer, Header } from "./components"
import { useEffect, useState } from "react"
import useProductStore from "./store/products-store"
import { superAxios } from "./utils"

const App = () => {
  console.log("app rendered")

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const addProducts = useProductStore(state => state.addProducts)

  useEffect(() => {
    const callSuperAxios = async () => {
      try {
        const res = await superAxios("get", "/products")
        addProducts(res.data.products)
        setLoading(false)
      } catch (error: any) {
        setError(error)
        setLoading(false)
      }
    }
    callSuperAxios()
  }, [])

  if (loading && !error) return <>Loading...</>
  else if (error) return <>something went wrong</>
  else
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    )
}

export default App
