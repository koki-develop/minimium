import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <h1>💖 Hello World!</h1>
    <p>Welcome to your Electron application.</p>
  </StrictMode>,
);
