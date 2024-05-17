import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRoutes from "./AppRoutes.jsx";
import AuthProvider from "./auth/AuthProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import { StateProvider } from "./StateProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StateProvider>
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  </StateProvider>
);
