import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createHashRouter } from "react-router-dom"
import Root from "./routes/Root"
import Pokedex from "./routes/Pokedex"
import About from "./routes/About"
import "./index.css"

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Pokedex />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
