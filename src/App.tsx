import { MainLayout } from "./layouts/MainLayout";
import "./App.css";
import { Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import NotFoundPage from "./components/NotFoundPage";
import { Navigate } from "react-router";
import { PokemonPage } from "./pages/PokemonPage";
import { Suspense } from "react";
import { LoadingSpinner } from "./components/LoadingSpinner";


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
           path="/"
           element={

              <Home />
           }
          />
        <Route
          path="/pokemon/:id"
          element={
            <Suspense fallback={<LoadingSpinner />}>

              <PokemonPage />
            </Suspense>
          }
         />
      </Route>
      <Route
        path="/404"
        element={<NotFoundPage />
        }
       />
      <Route
         path="*"
         element={
         <Navigate to="/404" replace />
         }
       />
    </Routes>
  );
}

export default App;
