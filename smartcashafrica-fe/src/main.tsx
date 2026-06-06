import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { AppDataProvider } from "@/context/AppDataContext";
import { I18nProvider } from "@/context/I18nContext";
import { ToastProvider } from "@/context/ToastContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <AppDataProvider>
          <I18nProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </I18nProvider>
        </AppDataProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
