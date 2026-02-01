import { PokemonCard } from './PokemonCard';
import { useLoadMorePokemon, usePokemonContext } from '../../hooks/hooks';
import { MyButton } from '../shared/MyButton';
import { EmptyState } from '../EmptyState';
import { LoadingSpinner } from '../LoadingSpinner';


export function PokemonGrid() {

    const {state} = usePokemonContext();

    const { loadMore } = useLoadMorePokemon();

    const pokemons = state.filteredPokemon.length > 0 ? state.filteredPokemon : state.allPokemon;

    if (state.isSearching) {
      return (
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner />
        </div>
      );
    }

    if (state.filteredPokemon.length === 0 && state.searchQuery) {
      return <EmptyState   />
    }

    if (state.filteredPokemon.length === 0) {

      return <EmptyState />
    }

    const MAX_POKEMON = 151;
    const isAllPokemonLoaded = pokemons.length >= MAX_POKEMON
    const isEmpty = pokemons.length === 1;
    const hasMore = !isEmpty && !isAllPokemonLoaded

  return (
   <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pokemons.map((elem) => (
          <PokemonCard key={elem.id} pokemon={elem} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center my-10 sm:p-6">
          <MyButton
            className="w-full sm:w-32 flex items-center justify-center min-h-11"
            type="button"
            variant="primary"
            ariaLabel="Load more Pokemon"
            onClick={() => loadMore(pokemons.length)}
            disabled={state.isLoadingMore}
          >
            {state.isLoadingMore ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "Load more"
            )}
          </MyButton>
        </div>
      )}
    </>
  );
}