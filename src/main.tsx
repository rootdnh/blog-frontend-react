import React from "react";
import ReactDOM from "react-dom/client";
import router from "./routes/router.tsx";
import { RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {AuthProvider} from "./context/AuthProvider/authProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
 <React.StrictMode>
  <AuthProvider>
   <RouterProvider router={router} />
  </AuthProvider>
 </React.StrictMode>
);
