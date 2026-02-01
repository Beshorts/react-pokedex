# Pokédex 

A React-based Pokédex application that allows users to browse, search, and explore the first 151 Pokémon. Built with React 19, TypeScript, and Tailwind CSS v4, using data from [PokeAPI](https://pokeapi.co/).

## Live Demo

[https://beshorts-pokedex.netlify.app/](https://beshorts-pokedex.netlify.app/)

---

## Prerequisites

- [Node.js](https://nodejs.org/) version **22.19** or higher

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Beshorts/react-pokedex.git
cd pokedex

# Install dependencies
npm install

# Run in development mode (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Project Structure

```
src/
├── components/               # Reusable UI components
│   ├── icons/                # SVG icon components (from Heroicons)
│   ├── shared/               # Shared components (Button)
│   ├── pokemon/              # Pokemon-related components
│   │   ├── PokemonList.tsx
│   │   ├── PokemonGrid.tsx
│   │   ├── PokemonGridNav.tsx
│   │   ├── PokemonDetail.tsx
│   │   └── PokemonCard.tsx
│   ├── BadgeType.tsx         # Pokemon type badge
│   ├── DropDown.tsx          # Reusable dropdown menu component
│   ├── EmptyState.tsx        # Empty search results state
│   ├── ErrorBoundary.tsx     # Error boundary for runtime errors
│   ├── LoadingSpinner.tsx.   # Loading state component
│   ├── Navbar.tsx            # Main navigation bar
│   ├── NotFoundPage.tsx.tsx  # 404 page
│   └── Search.tsx            # Search form
├── context/                  # Global state management
│   └── PokemonContext.tsx    # Pokemon state
├── hooks/                    # Custom React hooks
│   └── hooks.ts              # usePokemonContext, useLoadMorePokemon,
│                               useSearchPokemon
├── layouts/                  # Page layouts
│   └── MainLayout.tsx        # Main layout with Navbar and Outlet
├── pages/                    # Route-level components
│   ├── Home.tsx              # Home page
│   └── PokemonDetail.tsx     # Pokemon detail page
├── reducer/                  # Page layouts
│   └── pokemonReducer.tsx    # Handle logic state
├── services/                 # API layer
│   ├── api.ts                # Fetch functions with retry logic
│   └── pokemonResource.ts.   # Promise caching for use() API
├── types/                    # TypeScript interfaces
│   └── pokemon.ts            # Pokemon type definitions
└── utils/                    # Utility functions
    └── pokemon-helper.ts     # Data formatting and extraction
```

---

## Key Design Decisions

- **React 19 `use()` API + Suspense** — Declarative data fetching at the route level. Suspense boundaries handle loading states without `useEffect` or `useState` for fetching.
- **Promise caching** — Fetched Promises are cached in a `Map` to prevent infinite re-render loops when `use()` suspends a component.
- **React Compiler** — Automatically optimizes re-renders, removing the need for `useMemo`, `useCallback`, and `React.memo`.
- **Progressive loading** — Only the first 20 Pokémon are fetched initially. More are loaded on demand via "Load More" or search.
- **On-demand search fetching** — Searching for an unloaded Pokémon triggers a single API fetch instead of loading all 151 upfront.
- **Tailwind CSS v4** — Utility-first styling with zero runtime overhead and automatic dead CSS elimination. Custom design tokens defined via `@theme` in the global stylesheet.

---

## Data Source

All data is fetched from [PokeAPI](https://pokeapi.co/) using the following endpoints:

- `/pokemon-species?limit=151` — List of the first 151 Pokémon
- `/pokemon/{id}` — Pokémon data (sprites, types)
- `/pokemon-species/{id}` — Species details (genus, descriptions filtered for X/Y game versions)