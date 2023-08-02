import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login/login";
import App from "../App";
import Home from "../pages/home/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/home",
        element: <Home />
      }
    ]
  }
])

export default router;