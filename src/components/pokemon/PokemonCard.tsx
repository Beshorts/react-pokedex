import { BadgeType } from '../BadgeType';
import { formatPokemonName, formatPokemonId } from '../../utils/pokemon-helper';
import type { PokemonData } from '../../types/pokemon';

interface PokemonCardProps {
  pokemon: PokemonData;
  onClick?: (pokemon: PokemonData) => void;
}

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {

  const handleClick = () => {
    if (onClick) {
      onClick(pokemon);
    }
  };

  // add keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault();
      onClick(pokemon);
    }
  };

  return (
    <article
      className="group cursor-pointer rounded-xl border border-charcoal-10 bg-white p-4 transition-all hover:shadow-lg focus-within:ring-2 focus-within:ring-charcoal-50 focus-within:ring-offset-2"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`View details for ${formatPokemonName(pokemon.name)}`}
    >
      <div className="mb-3 bg-charcoal-5 rounded-lg flex items-center justify-center pt-4 pb-2 px-4">
        {pokemon.sprite ? (
          <img
            src={pokemon.sprite}
            alt={`${formatPokemonName(pokemon.name)} sprite`}
            className="h-50 w-50 object-contain transition-transform group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="flex h-50 w-50 items-center justify-center bg-charcoal-5 text-charcoal-10">
            <span className="text-body-sm leading-body-sm">
              No image
            </span>
          </div>
        )}
      </div>

      <p className="mb-1 text-body-sm leading-body-sm font-normal text-black">
        {formatPokemonId(pokemon.id)}
      </p>

      <h2 className="mb-1 text-body-lg font-extrabold leading-body-lg capitalize text-charcoal-100">
        {formatPokemonName(pokemon.name)}
      </h2>

      <div className="flex flex-wrap gap-2" role="list" aria-label="Pokemon types">
        {pokemon.types.map((type) => (
          <BadgeType key={type} type={type} />
        ))}
      </div>
    </article>
  );
}