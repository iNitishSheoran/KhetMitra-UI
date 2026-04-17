import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";   // ✅ router import
import App from "./App";
import "./index.css";
import { UserProvider } from "./context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
    <BrowserRouter>   {/* only one Router here */}
      <App />
    </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
