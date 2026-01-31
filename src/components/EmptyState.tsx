import { usePokemonContext, useSearchPokemon } from "../hooks/hooks";

export function EmptyState() {

      const {clearSearch} = useSearchPokemon()

      const {state} = usePokemonContext()

      const searchQuery = state.searchQuery

  return (
    <div
      className="flex min-h-100 flex-col items-center justify-center px-4 py-12 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="mb-4 rounded-full bg-charcoal-5 p-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-12 w-12 text-gray-400"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
          />
        </svg>
      </div>

      <h2 className="mb-2 text-h3 font-semibold leading-h3 text-charcoal-100">
        No Pokemon Found
      </h2>

      {searchQuery ? (
        <>
          <p className="mb-6 max-w-md text-body-md leading-body-md text-gray-600">
            We couldn't find any Pokemon matching <strong>"{searchQuery}"</strong>.
            Try a different search term or browse all Pokemon.
          </p>

          {clearSearch && (
            <button
              onClick={clearSearch}
              className="cursor-pointer rounded-lg bg-charcoal-100 px-6 py-2.5 text-body-md font-medium leading-body-md text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-charcoal-100 focus:ring-offset-2"
              aria-label="Clear search and show all Pokemon"
            >
              Show All Pokemon
            </button>
          )}
        </>
      ) : (
        <p className="max-w-md text-body-md leading-body-md text-gray-600">
          No Pokemon available at the moment. Please try loading more Pokemon.
        </p>
      )}
    </div>
  );
}