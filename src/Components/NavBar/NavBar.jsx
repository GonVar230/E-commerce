import NavDropdown from "../NavDropdown/NavDropdown";
import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css"
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    
    return (
        <nav className="navbar">
            <div className="nav-inner">

                <a href="#" className="logo">
                    <div className="logo-icon">
                        <i className="bi bi-trophy"></i>
                    </div>
                    <div className="logo-text">
                        <span className="logo-brand">VINTAGE</span>
                        <span className="logo-sub">JERSEYS</span>
                    </div>
                </a>

                <div className="nav-links">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Inicio</NavLink>
                    <NavDropdown />
                    <NavLink to="/ayuda" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Ayuda</NavLink>
                </div>

                <div className="nav-action">
                    <SearchBar />
                    <button className="nav-btn cart-btn">
                        <i className="bi bi-cart2"></i>
                    </button>
                </div>

            </div>
        </nav>
    )
}

export default NavBar;