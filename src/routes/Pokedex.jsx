import { useEffect, useState } from "react"
import Pagination from "../components/Pagination"
import PokemonDetails from "../components/PokemonDetails"
import PokemonList from "../components/PokemonList"

const PAGE_SIZE = 20

export default function Pokedex() {
  const [pokemon, setPokemon] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchPokemonPage() {
      setLoading(true)
      setError("")
      setSelectedPokemon(null)

      try {
        const offset = page * PAGE_SIZE
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`)

        if (!response.ok) {
          throw new Error("Could not load Pokemon list.")
        }

        const data = await response.json()
        setPokemon(data.results)
      } catch (err) {
        setError(err.message)
        setPokemon([])
      } finally {
        setLoading(false)
      }
    }

    fetchPokemonPage()
  }, [page])

  async function selectPokemon(url) {
    setLoading(true)
    setError("")

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Could not load Pokemon details.")
      }

      const data = await response.json()
      setSelectedPokemon(data)
    } catch (err) {
      setError(err.message)
      setSelectedPokemon(null)
    } finally {
      setLoading(false)
    }
  }

  function goToPreviousPage() {
    setPage(page - 1)
  }

  function goToNextPage() {
    setPage(page + 1)
  }

  return (
    <section>
      <div className="page-title">
        <h2>Pokemon list</h2>
        <Pagination page={page} onPreviousPage={goToPreviousPage} onNextPage={goToNextPage} />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="pokedex-layout">
        <PokemonList pokemon={pokemon} onSelectPokemon={selectPokemon} />
        <PokemonDetails pokemon={selectedPokemon} />
      </div>
    </section>
  )
}
