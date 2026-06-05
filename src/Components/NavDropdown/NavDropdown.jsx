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

    const close = () => setDropOpen(false)

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

                    <NavLink to="/productos" className="dropdown-link-all" onClick={close}>
                        <i className="bi bi-grid"></i> Ver todos
                    </NavLink>

                    <div className="dropdown-divider-full"></div>

                    <div className="dropdown-cols">
                        <div className="dropdown-col">
                            <span className="dropdown-title">Selecciones</span>
                            <NavLink to="/productos?cat=selecciones" className="dropdown-link" onClick={close}>TODAS</NavLink>
                            <NavLink to="/productos?cat=selecciones&conf=UEFA" className="dropdown-link" onClick={close}>UEFA</NavLink>
                            <NavLink to="/productos?cat=selecciones&conf=CONMEBOL" className="dropdown-link" onClick={close}>CONMEBOL</NavLink>
                            <NavLink to="/productos?cat=selecciones&conf=AFC" className="dropdown-link" onClick={close}>AFC</NavLink>
                        </div>

                        <div className="dropdown-divider"></div>

                        <div className="dropdown-col">
                            <span className="dropdown-title">Clubes</span>
                            <NavLink to="/productos?cat=clubes" className="dropdown-link" onClick={close}>TODOS</NavLink>
                            <NavLink to="/productos?cat=clubes&conf=UEFA" className="dropdown-link" onClick={close}>UEFA</NavLink>
                            <NavLink to="/productos?cat=clubes&conf=CONMEBOL" className="dropdown-link" onClick={close}>CONMEBOL</NavLink>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}

export default NavDropdown;