import { useEffect, useState } from "react"
import Pagination from "../components/Pagination"
import PokemonDetails from "../components/PokemonDetails"
import PokemonList from "../components/PokemonList"

const PAGE_SIZE = 20

function getPokemonImage(sprites) {
  return (
    sprites.front_default ||
    sprites.other?.showdown?.front_default ||
    sprites.other?.home?.front_default ||
    sprites.other?.["official-artwork"]?.front_default ||
    ""
  )
}

async function getFallbackSpeciesImage(speciesName) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${speciesName}`)

  if (!response.ok) {
    return ""
  }

  const data = await response.json()
  return getPokemonImage(data.sprites)
}

export default function Pokedex() {
  const [pokemon, setPokemon] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [page, setPage] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const totalPages = Math.ceil(totalCount / PAGE_SIZE) || 1

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
        const detailResponses = await Promise.all(data.results.map(p => fetch(p.url)))
        const details = await Promise.all(detailResponses.map(response => response.json()))
        const pokemonWithImages = await Promise.all(
          data.results.map(async (p, index) => {
            const detail = details[index]
            const image = getPokemonImage(detail.sprites) || (await getFallbackSpeciesImage(detail.species.name))

            return {
              ...p,
              id: detail.id,
              image,
            }
          })
        )

        setPokemon(pokemonWithImages)
        setTotalCount(data.count)
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
      const image = getPokemonImage(data.sprites) || (await getFallbackSpeciesImage(data.species.name))

      setSelectedPokemon({ ...data, image })
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

  function goToPage(pageNumber) {
    setPage(pageNumber)
  }

  function closeDetails() {
    setSelectedPokemon(null)
  }

  return (
    <section className="pokedex-page">
      <div className="page-title">
        <div>
          <p className="eyebrow">Pokedex</p>
          <h2>Browse Pokemon</h2>
        </div>
      </div>

      {loading && <p className="status">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="pokedex-layout">
        <PokemonList pokemon={pokemon} onSelectPokemon={selectPokemon} />
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={goToPage}
        onPreviousPage={goToPreviousPage}
        onNextPage={goToNextPage}
      />

      {selectedPokemon && (
        <div className="modal-backdrop" onClick={closeDetails}>
          <div className="modal" onClick={event => event.stopPropagation()}>
            <button className="modal-close" onClick={closeDetails} aria-label="Close details">
              X
            </button>
            <PokemonDetails pokemon={selectedPokemon} />
          </div>
        </div>
      )}
    </section>
  )
}
