import type { PokemonListResponse, PokemonApiResponse, PokemonSpeciesApiResponse } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Retrieves a list of Pokemon species with pagination support.
 * @param limit - Total number of species to fetch (defaults to 20).
 * @returns A promise resolving to the list of Pokemon names and resource URLs.
 */
export async function fetchPokemonList(limit: number = 20): Promise<PokemonListResponse> {
  const response = await fetch(`${BASE_URL}/pokemon-species?limit=${limit}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon list: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Fetches core Pokemon data, including types, stats, and sprites.
 * @param idOrName - The unique ID or string name of the Pokemon.
 * @returns A promise resolving to the details of the Pokemon.
 */
export async function fetchPokemon(idOrName: string | number): Promise<PokemonApiResponse> {
  const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon ${idOrName}: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Fetches descriptive metadata, such as genus information and flavor text.
 * @param idOrName - The unique ID or string name of the Pokemon species.
 * @returns A promise resolving to the species-specific (Genus / Description) data.
 */
export async function fetchPokemonSpecies(idOrName: string | number): Promise<PokemonSpeciesApiResponse> {
  const response = await fetch(`${BASE_URL}/pokemon-species/${idOrName}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon species ${idOrName}: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Executes multiple Pokemon requests in parallel batches (chunks).
 * Used to optimize network performance and avoid API rate limiting.
 * @param ids - Array of IDs to fetch.
 * @param chunkSize - Number of concurrent requests per batch (defaults to 20).
 * @returns A promise resolving to an array of successfully fetched Pokemon data.
 */
export async function fetchPokemonBatch(
  ids: number[],
  chunkSize: number = 20
): Promise<PokemonApiResponse[]> {
  const results: PokemonApiResponse[] = [];

  for (let i = 0; i < ids.length; i += chunkSize) {
    const chunk = ids.slice(i, i + chunkSize);
    const promises = chunk.map(id => fetchPokemon(id));

    try {
      const chunkResults = await Promise.all(promises);
      results.push(...chunkResults);
    } catch (error) {
      console.error(`Error fetching chunk starting at index ${i}:`, error);
    }
  }

  return results;
}

/**
 * A higher-order wrapper that implements an exponential backoff retry strategy.
 * Useful for handling transient network failures or 429 (Rate Limit) errors.
 * @param fetchData - The asynchronous function to execute.
 * @param retries - Maximum number of attempts (defaults to 3).
 * @param delay - Initial delay in milliseconds between retries.
 */
export async function fetchWithRetry<T>(
  fetchData: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetchData();
    } catch (error) {
      if (i === retries - 1) throw error;
      
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
  
  throw new Error('Failed after retries');
}