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



const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home />),
  },
  {
    path: "/login",
    element: (<Login />),
  },
  {
    path: "/signup",
    element: (<Signup />),
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);


