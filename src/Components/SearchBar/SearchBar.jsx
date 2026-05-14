import { useState } from 'react'
import './SearchBar.css'

const SearchBar = () => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')

    return (
        <div className="search-wrapper">
            <button className="nav-btn" onClick={() => setOpen(!open)}>
                <i className={`bi ${open ? 'bi-x-lg' : 'bi-search'}`}></i>
            </button>
            {open && (
                <input
                    type="text"
                    placeholder="Buscar jersey, jugador..."
                    className="search-input"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    autoFocus
                />
            )}
        </div>
    )
}

export default SearchBar;