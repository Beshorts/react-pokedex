import { PokemonGridNav } from "./PokemonGridNav";
import { PokemonGrid } from "./PokemonGrid";

export function PokemonList() {

  return (
      <div className="container mx-auto bg-white px-4">
        <PokemonGridNav />
        <main>
            <PokemonGrid />
        </main>
      </div>
  );
}
