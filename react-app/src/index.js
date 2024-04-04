import * as React from "react";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddProduct from "./components/AddProduct";
import ProductDetailPage from "./components/DetailProductPage";




const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home />),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "/login",
    element: (<Login />),
  },
  {
    path: "/signup",
    element: (<Signup />),
  },
  {
    path: "/add-product",
    element: (<AddProduct />),
  },
  {
    path: "/product/:productId",
    element: (<ProductDetailPage />)
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);


