
import type {
  PokemonSpeciesApiResponse,
  PokemonApiResponse,
  PokemonData,
} from '../types/pokemon';


/**
 * Locates the English localization for the Pokemon's genus (e.g., "Seed Pokemon").
 * Falls back to a generic string if the English entry is missing.
 */
export function getEnglishGenus(genera: PokemonSpeciesApiResponse['genera']): string {
  const englishGenus = genera.find((g) => g.language.name === 'en');
  return englishGenus?.genus || 'Unknown Pokemon';
}

/**
 * Aggregates flavor text entries specifically from Gen VI (X and Y versions).
 * Handles duplicate descriptions between versions and cleans up legacy 
 * formatting characters. Falls back to any available English entry.
 */
export function getFlavorTextXY(
  flavorTextEntries: PokemonSpeciesApiResponse['flavor_text_entries']
): string {
  const xyEntries = flavorTextEntries.filter(
    (entry) =>
      entry.language.name === 'en' &&
      (entry.version.name === 'x' || entry.version.name === 'y')
  );

  if (xyEntries.length > 0) {
    // map filtered items to clean text format.
    const cleanedTexts = xyEntries.map((entry) => cleanFlavorText(entry.flavor_text));
    
    // using Set to remove duplicates when version x and y share the same description
    const uniqueTexts = Array.from(new Set(cleanedTexts));
    
    // create a single paragraph.
    return uniqueTexts.join(' ');
  }

  // Fallback to any English version if versions X or Y are not available
  const englishText = flavorTextEntries.find(
    (entry) => entry.language.name === 'en'
  );

  return englishText ? cleanFlavorText(englishText.flavor_text) : 'No description available.';
}

/**
 * Clean flavor text (remove line breaks v and form feeds \f)
 * Collapse multiple whitespace characters into a single space
 * Triming leading and trailing spaces
 */
function cleanFlavorText(text: string): string {
  return text.replace(/[\n\f]/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Implements a fallback strategy to retrieve the highest quality image.
 * Prioritizes the high-resolution "Official Artwork" before falling back 
 * to the default front sprite.
 */
export function getBestSprite(sprites: PokemonApiResponse['sprites']): string {

  // Try official artwork first
  if (sprites.other?.['official-artwork']?.front_default) {
    return sprites.other['official-artwork'].front_default;
  }

  // fallback to default sprite
  return sprites.front_default || '';
}

/**
 * Extracts and sorts Pokemon types based on their internal slot priority
 * (e.g., ensuring "Fire" is listed before "Flying" for Charizard).
 */
export function getTypeNames(types: PokemonApiResponse['types']): string[] {
  return types
    .sort((a, b) => a.slot - b.slot) // Sort by slot to maintain order
    .map((t) => t.type.name);
}

/**
 * Data Mapper: Merges raw responses from /pokemon and /pokemon-species 
 * endpoints into a flat, UI-ready PokemonData object.
 */
export function combinePokemonData(
  pokemon: PokemonApiResponse,
  species?: PokemonSpeciesApiResponse
): PokemonData {
  return {
    id: pokemon.id,
    name: pokemon.name,
    sprite: getBestSprite(pokemon.sprites),
    types: getTypeNames(pokemon.types),
    genus: species ? getEnglishGenus(species.genera) : undefined,
    description: species ? getFlavorTextXY(species.flavor_text_entries) : undefined,
  };
}

/**
 * Capitalizes the first letter of a Pokemon's name for consistent UI display.
 */
export function formatPokemonName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * Converts a numeric ID into a padded string format (e.g., 1 becomes #0001).
 */
export function formatPokemonId(id: number): string {
  return `#${id.toString().padStart(4, '0')}`;
}

/**
 * Parses the numeric ID from a PokeAPI resource URL using regex.
 * Useful when the API provides a URL instead of a direct ID field.
 */
export function extractIdFromUrl(url: string): number {
  const matches = url.match(/\/(\d+)\//);
  return matches ? parseInt(matches[1], 10) : 0;
}