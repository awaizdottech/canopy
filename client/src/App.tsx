import { Outlet } from "react-router"
import "./App.css"
import { Footer, Header } from "./components"

const App = () => {
  console.log("app rendered")

  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  )
}

export default App
