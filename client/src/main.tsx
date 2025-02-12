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
import { Register } from "./components"
import AuthCheck from "./auth-wrappers/AuthCheck.tsx"
import AdminCheck from "./auth-wrappers/AdminCheck.tsx"

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <NotFound404 />,
    children: [
      {
        path: "/",
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
        path: "/register",
        element: <Register />,
      },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>
)
