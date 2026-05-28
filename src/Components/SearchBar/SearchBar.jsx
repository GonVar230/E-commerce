import useSearchBar from '../../hooks/useSearchBar'
import './SearchBar.css'

const SearchBar = () => {
    const { open, setOpen, query, suggestions, handleChange, handleSelect, handleClose } = useSearchBar()

    return (
        <div className="search-wrapper">
            <button className="nav-btn" onClick={() => open ? handleClose() : setOpen(true)}>
                <i className={`bi ${open ? 'bi-x-lg' : 'bi-search'}`}></i>
            </button>
            {open && (
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Buscar jersey, jugador..."
                        className="search-input"
                        value={query}
                        onChange={handleChange}
                        autoFocus
                    />
                    {suggestions.length > 0 && (
                        <div className="search-suggestions">
                            {suggestions.map(product => (
                                <div
                                    key={product.id}
                                    className="search-suggestion-item"
                                    onClick={() => handleSelect(product)}
                                >
                                    <img src={product.images[0]} alt={product.name} className="suggestion-img" />
                                    <div className="suggestion-info">
                                        <span className="suggestion-player">{product.player}</span>
                                        <span className="suggestion-team">{product.team} · {product.year}</span>
                                    </div>
                                    <i className="bi bi-arrow-right suggestion-arrow"></i>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchBar;