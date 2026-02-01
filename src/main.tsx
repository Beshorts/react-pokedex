import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { PokemonProvider } from "./context/PokemonContext.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <PokemonProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PokemonProvider>
    </ErrorBoundary>
  </StrictMode>,
);
