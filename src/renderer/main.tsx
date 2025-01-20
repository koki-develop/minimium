import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "@mantine/core/styles.css";
import "./index.css";
import { MantineProvider } from "@mantine/core";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </StrictMode>,
);
