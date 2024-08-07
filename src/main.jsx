import "./index.css"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import ReduxProvider from "./components/provider/redux-provider.jsx"
import { router } from "./router/router.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <ReduxProvider>
    <RouterProvider router={router} />
  </ReduxProvider>,
)
