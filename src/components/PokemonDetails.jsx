export default function PokemonDetails({ pokemon }) {
  if (!pokemon) {
    return (
      <section className="details">
        <h2>Pokemon details</h2>
        <p>Select a Pokemon to see more information.</p>
      </section>
    )
  }

  const image = pokemon.image || pokemon.sprites.front_default
  const types = pokemon.types.map(item => item.type.name).join(", ")
  const abilities = pokemon.abilities.map(item => item.ability.name).join(", ")

  return (
    <section className="details">
      <h2>{pokemon.name}</h2>

      {image && <img className="pokemon-image" src={image} alt={pokemon.name} />}

      <p>
        <strong>Types:</strong> {types}
      </p>
      <p>
        <strong>Abilities:</strong> {abilities}
      </p>
      <p>
        <strong>Height:</strong> {pokemon.height / 10} m
      </p>
      <p>
        <strong>Weight:</strong> {pokemon.weight / 10} kg
      </p>

      <h3>Stats</h3>
      <ul>
        {pokemon.stats.map(item => (
          <li key={item.stat.name}>
            {item.stat.name}: {item.base_stat}
          </li>
        ))}
      </ul>
    </section>
  )
}
