import { Link } from "react-router";
import { BadgeType } from "../BadgeType";
import { formatPokemonName, formatPokemonId } from "../../utils/pokemon-helper";
import type { PokemonData } from "../../types/pokemon";

interface PokemonCardProps {
  pokemon: PokemonData;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      aria-label={`View details for ${formatPokemonName(pokemon.name)}`}
    >
      <article className="group cursor-pointer rounded-xl border border-gray-300 bg-white p-4 transition-all hover:shadow-lg focus-within:ring-2 focus-within:ring-charcoal-50 focus-within:ring-offset-2">
        <div className="bg-charcoal-5 rounded-lg flex items-center justify-center mb-3 pt-4 pb-2 px-4">
          {pokemon.sprite ? (
            <img
              src={pokemon.sprite}
              alt={`${formatPokemonName(pokemon.name)} sprite`}
              className="h-50 w-50 object-contain transition-transform group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="flex h-50 w-50 items-center justify-center bg-charcoal-5 text-charcoal-10">
              <span className="text-body-sm leading-body-sm">No image</span>
            </div>
          )}
        </div>

        <p className="text-body-sm leading-body-sm font-normal text-black mb-1">
          {formatPokemonId(pokemon.id)}
        </p>

        <h2 className="text-body-lg font-extrabold leading-body-lg capitalize text-charcoal-100 mb-1">
          {formatPokemonName(pokemon.name)}
        </h2>
          <ul className="flex flex-wrap gap-2" aria-label="Pokemon types">
            {pokemon.types.map((type) => (
              <li key={type}>
                <BadgeType type={type} />
              </li>
            ))}
          </ul>
      </article>
    </Link>
  );
}
