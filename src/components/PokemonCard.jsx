export default function PokemonCard({ pokemon, onSelectPokemon }) {
  return (
    <button className="pokemon-card" onClick={() => onSelectPokemon(pokemon.url)}>
      <span className="pokemon-number">#{pokemon.id}</span>
      {pokemon.image ? (
        <img className="pokemon-card-image" src={pokemon.image} alt={pokemon.name} />
      ) : (
        <span className="pokemon-card-image missing-image">No image</span>
      )}
      <span className="pokemon-card-name">{pokemon.name}</span>
    </button>
  )
}
