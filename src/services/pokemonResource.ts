import type { PokemonData } from "../types/pokemon";
import { combinePokemonData, extractIdFromUrl } from "../utils/pokemon-helper";
import { fetchPokemon, fetchPokemonList, fetchPokemonSpecies, fetchWithRetry } from "./api";

/**
 * Global variable to cache the initial data request.
 * Acts as a Singleton to ensure the API is called only once per session.
 */
let pokemonPromise: Promise<PokemonData[]> | null = null;

/**
 * Orchestrates the initial data fetch for the application.
 * * Performance Optimization (lighthouse):
 * - Uses Promise.all to fetch the initial list and subsequent details in parallel.
 * - Inside the mapping, it parallelizes technical data and species metadata 
 * to avoid "waterfall" requests, significantly reducing the Critical Request Chain length.
 * - Robustness: Uses retry logic for transient failures and filters out null results.
 * * @returns A promise resolving to an array of valid PokemonData.
 */
async function fetchInitialPokemon(): Promise<PokemonData[]> {
  const listResponse = await fetchWithRetry(() => fetchPokemonList(20)); //151
  const firstBatch = listResponse.results.slice(0, 20);

  const results = await Promise.all(
    firstBatch.map(async (species) => {
      const id = extractIdFromUrl(species.url);

      try {
        const [pokemon, speciesData] = await Promise.all([
          fetchWithRetry(() => fetchPokemon(id)),
          fetchWithRetry(() => fetchPokemonSpecies(id))
        ]);
        return combinePokemonData(pokemon, speciesData);
      } catch {
        return null;
      }
    })
  );

  return results.filter(Boolean) as PokemonData[];
}

/**
 * Returns the stable resource promise used by `use()` hook.
 * If the promise doesn't exist, it initializes the fetch process.
 * This ensures that Suspense-enabled components share the same data source.
 * @returns The active promise for initial Pokemon data.
 */
export function getPokemonResource() {
  if (!pokemonPromise) {
    pokemonPromise = fetchInitialPokemon();
  }
  return pokemonPromise;
}
