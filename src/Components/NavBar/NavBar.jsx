import NavDropdown from "../NavDropdown/NavDropdown"
import SearchBar from "../SearchBar/SearchBar"
import "./NavBar.css"
import { NavLink } from 'react-router-dom'
import { useCart } from '../../Context/useCart'

const NavBar = () => {
    // Trae el carrito para mostrar la cantidad de productos en el badge
    const { cart } = useCart()

    return (
        <nav className="navbar">
            <div className="nav-inner">

                {/* Logo que lleva al inicio */}
                <a href="#" className="logo">
                    <div className="logo-icon">
                        <i className="bi bi-trophy"></i>
                    </div>
                    <div className="logo-text">
                        <span className="logo-brand">VINTAGE</span>
                        <span className="logo-sub">JERSEYS</span>
                    </div>
                </a>

                {/* Links de navegación principal */}
                <div className="nav-links">
                    {/* isActive agrega la clase active al link de la ruta actual */}
                    <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Inicio</NavLink>
                    {/* Dropdown con filtros de productos por categoría y confederación */}
                    <NavDropdown />
                    <NavLink to="/ayuda" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Ayuda</NavLink>
                </div>

                {/* Acciones de la derecha: barra de búsqueda y carrito */}
                <div className="nav-action">
                    <SearchBar />
                    <NavLink to="/carrito" className="nav-btn cart-btn">
                        <i className="bi bi-cart2"></i>
                        {/* Muestra el badge con la cantidad de productos solo si hay algo en el carrito */}
                        {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
                    </NavLink>
                </div>

            </div>
        </nav>
    )
}

export default NavBar;