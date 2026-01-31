import { useContext } from "react";
import {
  fetchPokemonList,
  fetchPokemon,
  fetchPokemonSpecies,
  fetchWithRetry,
} from "../services/api";
import { combinePokemonData, extractIdFromUrl } from "../utils/pokemon-helper";
import {
  PokemonContext,
  type PokemonContextValue,
} from "../context/PokemonContext";

/**
 * it provides access to Pokemon context
 * ensures that it is used whithin PokemonProvider
 * throw error in console if it is not within the provider
 */

export function usePokemonContext(): PokemonContextValue {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemonContext must be used within PokemonProvider!");
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

    dispatch({ type: "SET_IS_LOADING_MORE", payload: true });

   try {
      const listResponse = await fetchPokemonList(151);
      const batch = listResponse.results.slice(startIndex, endIndex);

      const newPokemon = await Promise.all(
        batch.map(async (species) => {
          const id = extractIdFromUrl(species.url);
          const pokemon = await fetchPokemon(id);
          const speciesData = await fetchPokemonSpecies(id);
          return combinePokemonData(pokemon, speciesData);
        }),
      );

      newPokemon.forEach((p) => dispatch({ type: "ADD_POKEMON", payload: p }));
    } catch (error) {
      console.error("Failed to load more Pokemon:", error);
    } finally {
      // 2. Spegniamo lo spinner in ogni caso (successo o errore)
      dispatch({ type: "SET_IS_LOADING_MORE", payload: false });
    }
  }

  return { loadMore };
}

/**
   * Searches for a Pokemon by exact name or ID match.
   * * The logic follows these steps:
   * 1. Updates the global search query state to sync with the UI.
   * 2. Filters existing local data for an immediate match.
   * 3. If no local match is found, attempts to fetch from the PokeAPI.
   * 4. Manages a global 'isSearching' state to coordinate loading spinners
   * across the Search and Grid components.
   * * query param for search term (Pokemon name or ID).
  */

export function useSearchPokemon() {
  const { state, dispatch } = usePokemonContext();

  async function searchPokemon(query: string) {
    if (!query) {
      dispatch({ type: "SET_FILTERED_POKEMON", payload: state.allPokemon });
      dispatch({ type: "SET_SEARCH_QUERY", payload: "" });
      return;
    }

    dispatch({ type: 'SET_IS_SEARCHING', payload: true });

    try {
      const lowerQuery = query.toLowerCase().trim();
      
      dispatch({ type: "SET_SEARCH_QUERY", payload: lowerQuery });

      const queryWithoutHash = lowerQuery.replace("#", "");

      const filtered = state.allPokemon.filter((pokemon) => {
        const pokemonName = pokemon.name.toLowerCase();
        const pokemonId = pokemon.id.toString();
        return pokemonName === lowerQuery || pokemonId === queryWithoutHash;
      });

      const isIdQuery = /^\d+$/.test(queryWithoutHash);

      if (filtered.length === 0) {
        if (isIdQuery) {
          const pokemonId = parseInt(queryWithoutHash, 10);
          if (pokemonId >= 1 && pokemonId <= 151) {
            try {
              const [pokemon, speciesData] = await Promise.all([
                fetchWithRetry(() => fetchPokemon(pokemonId)),
                fetchWithRetry(() => fetchPokemonSpecies(pokemonId)),
              ]);
              const newPokemon = combinePokemonData(pokemon, speciesData);
              dispatch({ type: "ADD_POKEMON", payload: newPokemon });
              filtered.push(newPokemon);
            } catch (e) { console.error(e); }
          }
        } else {
          try {
            const pokemon = await fetchWithRetry(() => fetchPokemon(lowerQuery));
            if (pokemon && pokemon.id <= 151) {
              const speciesData = await fetchWithRetry(() => fetchPokemonSpecies(pokemon.id));
              const newPokemon = combinePokemonData(pokemon, speciesData);
              dispatch({ type: "ADD_POKEMON", payload: newPokemon });
              filtered.push(newPokemon);
            }
          } catch (e) { console.error(e); }
        }
      }

      dispatch({ type: "SET_FILTERED_POKEMON", payload: filtered });

    } finally {
      dispatch({ type: 'SET_IS_SEARCHING', payload: false });
    }
  }

  function clearSearch() {
    dispatch({ type: "SET_SEARCH_QUERY", payload: "" });
    dispatch({ type: "SET_FILTERED_POKEMON", payload: state.allPokemon });
    dispatch({ type: 'SET_IS_SEARCHING', payload: false });
  }

  return { searchPokemon, clearSearch };
}