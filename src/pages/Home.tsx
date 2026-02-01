import { Suspense } from "react";
import { PokemonList } from "../components/pokemon/PokemonList";
import { PokemonDataInitializer } from "../context/PokemonContext";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function Home() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <PokemonDataInitializer />
        <PokemonList />
      </Suspense>
    </>
  );
}
