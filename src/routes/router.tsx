import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login/login";
import App from "../App";
import Home from "../pages/home/home";
import CreateNews from "../pages/create-news/createNews";
import {ProtectedRoute} from "../components/protected-route/protectedRoute";
import NotFound from "../pages/not found/notFound";
import NewsDetails from "../pages/news-details/newsDetails.tsx";
import { PostManagement } from "../pages/management/posts-management/postManagement.tsx";
import { CategoryManagement } from "../pages/management/category-management/categoryManagement.tsx";
import { UserManagement } from "../pages/management/user-management/userManagement.tsx";
import { PostEdit } from "../pages/management/posts-management/post-edit/postEdit.tsx";
import { UserEdit } from "../pages/management/user-management/user-edit/userEdit.tsx";
import { CategoryEdit } from "../pages/management/category-management/category-edit/categoryEdit.tsx";
import { Search } from "../pages/search/search.tsx";

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
        path: "/news/:slug",
        element: <NewsDetails />
      },
      {
        path: "/page/:page",
        element: <Home/>
      },
      {
        path: "/management/posts",
        element: <ProtectedRoute><PostManagement/></ProtectedRoute>
      },
      {
        path: "/management/posts/edit/:postSlug",
        element: <ProtectedRoute><PostEdit/></ProtectedRoute>
      },
      {
        path: "/management/category/edit/:categoryId",
        element: <ProtectedRoute><CategoryEdit/></ProtectedRoute>
      },
      {
        path: "/management/user/edit/:userId",
        element: <ProtectedRoute><UserEdit/></ProtectedRoute>
      },
      {
        path: "/management/category",
        element: <ProtectedRoute><CategoryManagement/></ProtectedRoute>
      },
      {
        path: "/management/user",
        element: <ProtectedRoute><UserManagement/></ProtectedRoute>
      },
      {
        path: "/search",
        element: <Search/>
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])

export default router;