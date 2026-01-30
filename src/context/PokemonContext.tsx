import {
  createContext,
  Suspense,
  use,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type { PokemonData } from "../types/pokemon";
import { getPokemonResource } from "../services/pokemonResource";
import { usePokemonContext } from "../hooks/hooks";
import { LoadingSpinner } from "../components/LoadingSpinner";

interface PokemonState {
  allPokemon: PokemonData[];
  filteredPokemon: PokemonData[];
  searchQuery: string;
}

type PokemonAction =
  | { type: "SET_ALL_POKEMON"; payload: PokemonData[] }
  | { type: "SET_FILTERED_POKEMON"; payload: PokemonData[] }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "ADD_POKEMON"; payload: PokemonData };

const initialState: PokemonState = {
  allPokemon: [],
  filteredPokemon: [],
  searchQuery: "",
};

function pokemonReducer(
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

    case "ADD_POKEMON": {
      // Add a single Pokemon (for on-demand fetching)
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

export interface PokemonContextValue {
  state: PokemonState;
  dispatch: React.Dispatch<PokemonAction>;
}

const PokemonContext = createContext<PokemonContextValue | undefined>(
  undefined,
);

function PokemonDataInitializer() {
  const pokemon = use(getPokemonResource());
  const { dispatch } = usePokemonContext();

  // Syncs the resolved Promise data with the global Reducer state
  useEffect(() => {
    dispatch({ type: "SET_ALL_POKEMON", payload: pokemon });
  }, [pokemon, dispatch]);

  return null;
}
export function PokemonProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  return (
    <PokemonContext value={{ state, dispatch }}>
      <Suspense fallback={<LoadingSpinner />}>
        <PokemonDataInitializer />
        {children}
      </Suspense>
    </PokemonContext>
  );
}

export { PokemonContext };
