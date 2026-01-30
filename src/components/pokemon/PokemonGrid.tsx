import { PokemonCard } from './PokemonCard';
import type { PokemonData } from '../../types/pokemon';
import { useLoadMorePokemon, usePokemonContext } from '../../hooks/hooks';
import { MyButton } from '../shared/MyButton';

interface PokemonGridProps {
  onPokemonClick?: (pokemon: PokemonData) => void;
}

export function PokemonGrid({ onPokemonClick }: PokemonGridProps) {

    const {state} = usePokemonContext();

    const { loadMore } = useLoadMorePokemon();

    const pokemons = state.filteredPokemon

    const MAX_POKEMON = 151;
    const isAllPokemonLoaded = pokemons.length >= MAX_POKEMON
    const isEmpty = pokemons.length === 0;
    const hasMore = !isEmpty && !isAllPokemonLoaded

  return (
    <>
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      role="list"
      aria-label="Pokemon gallery"
    >
      {pokemons.map((elem) => (
        <PokemonCard
          key={elem.id}
          pokemon={elem}
          onClick={onPokemonClick}
        />
      ))}
    </div>
     {hasMore && (
            <div className="flex justify-center p-6 mb-10">
              <MyButton
                type="button"
                variant="primary"
                ariaLabel="Load more Pokemon"
                onClick={() => loadMore(pokemons.length)}
              >
                Load more
              </MyButton>
            </div>
          )}
    </>
  );
}