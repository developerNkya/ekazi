import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#0f172a", color: "#f8fafc",
          fontSize: "13.5px", fontWeight: 500,
          borderRadius: "10px", padding: "10px 14px",
          boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        },
        success: { iconTheme: { primary: "#10b981", secondary: "#fff" } },
        error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
      }}
    />
    <App />
  </React.StrictMode>
);