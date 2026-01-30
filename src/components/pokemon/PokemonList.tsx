import { PokemonGridNav } from "./PokemonGridNav";
import { PokemonGrid } from "./PokemonGrid";
import type { PokemonData } from "../../types/pokemon";

export function PokemonList() {
 
  const handlePokemonClick = (pokemon: PokemonData) => {
    /** TO DO: on click go to  /pokemon/${pokemon.id}` */
  };

  return (
      <div className="container mx-auto bg-white px-4">
        <PokemonGridNav />
        <main>
            <PokemonGrid onPokemonClick={handlePokemonClick} />
        </main>
      </div>
  );
}
