export default function PokemonCard({ pokemon, onSelectPokemon }) {
  return (
    <button className="pokemon-card" onClick={() => onSelectPokemon(pokemon.url)}>
      {pokemon.name}
    </button>
  )
}
