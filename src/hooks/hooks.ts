import { useContext } from 'react';
import { fetchPokemonList, fetchPokemon, fetchPokemonSpecies } from '../services/api';
import { combinePokemonData, extractIdFromUrl } from '../utils/pokemon-helper';
import { PokemonContext, type PokemonContextValue } from '../context/PokemonContext';

/**
 * it provides access to Pokemon context
 * ensures that it is used whithin PokemonProvider
 * throw error in console if it is not within the provider
 */

export function usePokemonContext(): PokemonContextValue {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemonContext must be used within PokemonProvider!');
  }
  return context;
}

/**
 * Custom hook to manage incremental loading of Pokemon data.
 * Calculates the next batch of Pokemon (up to 20 at a time) starting from the current count.
 * Ensures the total does not exceed the  limit (151).
 * Fetches basic data, species details, and merges them for each Pokemon in the batch.
 * Dispatches each new Pokemon to the global state as it is processed.
 * * @returns {loadMore} A function that takes currentCount as an argument to fetch the next set.
 */
export function useLoadMorePokemon() {

  const { dispatch } = usePokemonContext();

  async function loadMore(currentCount: number) {
    const startIndex = currentCount;
    const endIndex = Math.min(startIndex + 20, 151);

    const listResponse = await fetchPokemonList(151);
    const batch = listResponse.results.slice(startIndex, endIndex);

    const newPokemon = await Promise.all(
      batch.map(async (species) => {
        const id = extractIdFromUrl(species.url);
        const pokemon = await fetchPokemon(id);
        const speciesData = await fetchPokemonSpecies(id);
        return combinePokemonData(pokemon, speciesData);
      })
    );
    
    newPokemon.forEach(p => dispatch({ type: 'ADD_POKEMON', payload: p }));
  }
  
  return { loadMore };
}


