import {
  createContext,
  use,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import { usePokemonContext } from "../hooks/hooks";
import { getPokemonResource } from "../services/pokemonResource";
import { pokemonReducer, type PokemonAction, type PokemonState } from "../reducer/pokemonReducer";

export interface PokemonContextValue {
  state: PokemonState;
  dispatch: React.Dispatch<PokemonAction>;
}

const initialState: PokemonState = {
  allPokemon: [],
  filteredPokemon: [],
  searchQuery: "",
  isSearching: false,
  isLoadingMore: false,
};

const PokemonContext = createContext<PokemonContextValue | undefined>(
  undefined,
);

export function PokemonDataInitializer() {
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
        {children}
    </PokemonContext>
  );
}

export { PokemonContext };
