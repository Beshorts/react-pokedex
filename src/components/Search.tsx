import { MyButton } from "../components/shared/MyButton";
import { SearchIcon } from "../components/icons/SearchIcon";
import { usePokemonContext, useSearchPokemon } from "../hooks/hooks";

interface SearchProps {
  placeholder?: string;
}
export function Search({ placeholder = "Pikachu, 25" }: SearchProps) {
  const { searchPokemon, clearSearch } = useSearchPokemon();
  const { state, dispatch } = usePokemonContext();

  const query = state.searchQuery;

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    searchPokemon(query.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row items-center gap-2 w-full max-w-md py-4"
      role="search"
      aria-label="Search Pokemon"
    >

      <div className="relative flex-1">
      <label htmlFor="pokemon-search" className="font-bold text-body-sm leading-body-sm sr-only sm:not-sr-only">
        Name or number
      </label>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full rounded-lg border border-charcoal-10 bg-white pl-4 pr-10 sm:pr-4 py-2 text-body-md leading-body-md text-charcoal-100 placeholder:text-gray-400 focus:border-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Search input"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-100 sm:hidden"
        >
          <SearchIcon />
        </button>
      </div>

      <div className="hidden place-self-end sm:flex gap-2 h-11 sm:h-auto">
        <MyButton
          type="submit"
          variant="primary"
          ariaLabel="Search Pokemon"
          className="flex items-center"
        >
          <SearchIcon />
        </MyButton>
        <MyButton
          variant="secondary"
          onClick={clearSearch}
          aria-label="Show All"
          className="flex items-center"
        >
          All
        </MyButton>
      </div>
      <MyButton
        variant="primary"
        onClick={clearSearch}
        className="sm:hidden shrink-0 h-10.5 px-3 min-w-10.5 flex items-center justify-center rounded-lg"
      >
        <span className="text-xs font-bold">All</span>
      </MyButton>
    </form>
  );
}
