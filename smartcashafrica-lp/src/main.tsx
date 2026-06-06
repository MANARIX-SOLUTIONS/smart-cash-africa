import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DemoProvider } from "@/context/DemoContext";
import { I18nProvider } from "@/context/I18nContext";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <DemoProvider>
        <App />
      </DemoProvider>
    </I18nProvider>
  </StrictMode>,
);
