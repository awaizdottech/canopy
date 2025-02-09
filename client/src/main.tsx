import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { RouterProvider, createBrowserRouter } from "react-router"
import {
  AdminPortal,
  Cart,
  Checkout,
  Home,
  NotFound404,
  ProductDetails,
  UserDashboard,
} from "./pages"
import { AdminCheck, AuthCheck } from "./auth-wrappers/index.ts"
import { Register } from "./components"

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <NotFound404 />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "dashboard",
        element: (
          <AuthCheck>
            <UserDashboard />
          </AuthCheck>
        ),
      },
      {
        path: "checkout",
        element: (
          <AuthCheck>
            <Checkout />
          </AuthCheck>
        ),
      },
      {
        path: "admin",
        element: (
          <AdminCheck>
            <AdminPortal />
          </AdminCheck>
        ),
      },
      {
        path: "temp",
        element: <Register />,
      },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
