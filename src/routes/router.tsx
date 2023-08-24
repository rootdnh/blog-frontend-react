import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login/login";
import App from "../App";
import Home from "../pages/home/home";
import CreateNews from "../pages/create-news/createNews";
import {ProtectedRoute} from "../components/protected-route/protectedRoute";
import NotFound from "../pages/not found/notFound";

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
        path: "/",
        element: <Home />
      },
      {
        path: "/create-news",
        element: <ProtectedRoute><CreateNews /></ProtectedRoute>
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])

export default router;