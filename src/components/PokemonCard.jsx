export default function PokemonCard({ pokemon, onSelectPokemon }) {
  const id = pokemon.url.split("/").filter(Boolean).pop()
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

  return (
    <button className="pokemon-card" onClick={() => onSelectPokemon(pokemon.url)}>
      <span className="pokemon-number">#{id}</span>
      <img className="pokemon-card-image" src={image} alt={pokemon.name} />
      <span className="pokemon-card-name">{pokemon.name}</span>
    </button>
  )
}
