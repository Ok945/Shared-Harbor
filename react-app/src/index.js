import * as React from "react";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider} from "./context/AuthContext.jsx"; // Import your AuthContextProvider

import App from "./App.js";
import { SocketContextProvider } from "./context/SocketContext.js";






ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
      <SocketContextProvider>
        <App/>
      </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>

);
