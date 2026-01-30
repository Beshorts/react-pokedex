import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PokemonProvider } from "./context/PokemonContext.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <PokemonProvider>
        <App />
      </PokemonProvider>
    </ErrorBoundary>
  </StrictMode>,
);
