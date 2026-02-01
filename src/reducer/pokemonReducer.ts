import type { PokemonData } from "../types/pokemon";

export interface PokemonState {
  allPokemon: PokemonData[];
  filteredPokemon: PokemonData[];
  searchQuery: string;
  isSearching: boolean;
  isLoadingMore: boolean;
}

export type PokemonAction =
  | { type: "SET_ALL_POKEMON"; payload: PokemonData[] }
  | { type: "SET_FILTERED_POKEMON"; payload: PokemonData[] }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_IS_SEARCHING"; payload: boolean }
  | { type: "SET_IS_LOADING_MORE"; payload: boolean }
  | { type: "ADD_POKEMON"; payload: PokemonData };


export function pokemonReducer(
  state: PokemonState,
  action: PokemonAction,
): PokemonState {
  switch (action.type) {
    case "SET_ALL_POKEMON":
      return {
        ...state,
        allPokemon: action.payload,
        filteredPokemon: action.payload,
      };

    case "SET_FILTERED_POKEMON":
      return {
        ...state,
        filteredPokemon: action.payload,
      };

    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };

    case "SET_IS_SEARCHING":
      return {
        ...state, isSearching: action.payload
      };

    case "SET_IS_LOADING_MORE":
      return {
        ...state, isLoadingMore: action.payload
      };

    case "ADD_POKEMON": {
      const exists = state.allPokemon.some((p) => p.id === action.payload.id);
      if (exists) return state;

      const updatedAll = [...state.allPokemon, action.payload].sort(
        (a, b) => a.id - b.id,
      );
      return {
        ...state,
        allPokemon: updatedAll,
        filteredPokemon: state.searchQuery
          ? updatedAll.filter((p) =>
              p.name.toLowerCase().includes(state.searchQuery.toLowerCase()),
            )
          : updatedAll,
      };
    }

    default:
      return state;
  }
}

