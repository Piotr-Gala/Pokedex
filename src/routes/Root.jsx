import { Link, Outlet } from "react-router-dom"

export default function Root() {
  return (
    <div className="app">
      <header className="header">
        <h1>Pokedex</h1>
        <nav className="nav">
          <Link to="/">Pokedex</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
