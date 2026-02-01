import { Link, useParams } from "react-router";
import { usePokemonContext } from "../../hooks/hooks";
import { BadgeType } from "../BadgeType";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import { formatPokemonId, formatPokemonName } from "../../utils/pokemon-helper";
import { getSinglePokemonResource } from "../../services/pokemonResource";
import { use } from "react";

export function PokemonDetail() {
  const currentId = useParams();
  const idAsNum = parseInt(currentId.id || "0");
  const { state } = usePokemonContext();

  let pokemon = state.allPokemon.find((p) => p.id === idAsNum);

  if (!pokemon) {
    pokemon = use(getSinglePokemonResource(idAsNum));
  }
  return (
    <article
      className="container mx-auto flex flex-col items-center pt-4 pb-10 sm:px-4 sm:pt-10"
      aria-labelledby="pokemon-name"
    >
      <Link to={"/"} className="w-10 h-10 self-start flex justify-center items-center mb-2 hover:rounded-full hover:bg-white hover:border-2  hover:border-charcoal-10 sm:mb-6">
        <ArrowLeftIcon />
        <span className="sr-only">Back</span>
      </Link>
      <div className="w-full bg-charcoal-5  flex items-center justify-center p-4 mb-4 sm:p-8">
        {pokemon.sprite ? (
          <img
            src={pokemon.sprite}
            alt={`${formatPokemonName(pokemon.name)} official artwork`}
            className="w-50 h-50 object-contain sm:w-64 sm:h-64"
            loading="lazy"
          />
        ) : (
          <div className="flex h-50 w-50 items-center justify-center bg-charcoal-5 text-black sm:w-64 sm:h-64">
            <span className="text-body-sm leading-body-sm">No image</span>
          </div>
        )}
      </div>
      <p
        className="text-body-sm leading-body-sm font-normal text-black sm:text-body-lg sm:leading-body-lg"
      >
        {formatPokemonId(pokemon.id)}
      </p>

      <h1
        id="pokemon-name"
        className="text-2xl font-extrabold capitalize text-charcoal-100 mb-2 sm:text-h1 sm:leading-h1"
      >
        {pokemon.name}
      </h1>
      <ul className="flex gap-3 mb-4" aria-label="Pokemon types">
        {pokemon.types.map((type) => (
          <li key={type}>
            <BadgeType type={type} />
          </li>
        ))}
      </ul>
      <h2 className="text-body-lg leading-body-lg font-bold text-charcoal-100 mb-3 sm:text-h3">
        {pokemon.genus}
      </h2>
      <div className="w-full text-center px-4" aria-label="Pokemon biography">
        <p className="text-body-md leading-body-md font-medium text-black max-w-prose mx-auto sm:text-body-lg sm:leading-lg">
          {pokemon.description}
        </p>
      </div>
    </article>
  );
}
