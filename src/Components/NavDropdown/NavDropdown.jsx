import { useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import './NavDropdown.css'

const NavDropdown = () => {
    const [dropOpen, setDropOpen] = useState(false)
    const timeoutRef = useRef(null)

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current)
        setDropOpen(true)
    }

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setDropOpen(false)
        }, 200)
    }

    return (
        <div
            className="nav-dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <NavLink to="/productos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Productos <i className="bi bi-chevron-down drop-icon"></i>
            </NavLink>

            {dropOpen && (
                <div className="dropdown-menu">

                    <div className="dropdown-col">
                        <span className="dropdown-title">Selecciones</span>
                        <NavLink to="/productos/selecciones" className="dropdown-link">TODAS</NavLink>
                        <NavLink to="/productos/UEFA" className="dropdown-link">UEFA</NavLink>
                        <NavLink to="/productos/CONMEBOL" className="dropdown-link">CONMEBOL</NavLink>
                        <NavLink to="/productos/AFC" className="dropdown-link">AFC</NavLink>
                    </div>

                    <div className="dropdown-divider"></div>

                    <div className="dropdown-col">
                        <span className="dropdown-title">Clubes</span>
                        <NavLink to="/productos/clubes" className="dropdown-link">TODOS</NavLink>
                        <NavLink to="/productos/UEFA" className="dropdown-link">UEFA</NavLink>
                        <NavLink to="/productos/CONMEBOL" className="dropdown-link">CONMEBOL</NavLink>
                    </div>

                </div>
            )}
        </div>
    )
}

export default NavDropdown