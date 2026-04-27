import PokemonCard from "./PokemonCard"

export default function PokemonList({ pokemon, onSelectPokemon }) {
  return (
    <div className="pokemon-list">
      {pokemon.map(p => (
        <PokemonCard key={p.name} pokemon={p} onSelectPokemon={onSelectPokemon} />
      ))}
    </div>
  )
}
