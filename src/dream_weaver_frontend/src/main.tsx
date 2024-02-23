import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { UserProvider } from "./contexts/auth-context";

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <UserProvider>
      <App />
    </UserProvider>
  );
}
