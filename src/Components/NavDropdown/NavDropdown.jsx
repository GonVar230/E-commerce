import { useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import './NavDropdown.css'

const NavDropdown = () => {
    // Controla si el dropdown está abierto o cerrado
    const [dropOpen, setDropOpen] = useState(false)
    // Guarda el temporizador para poder cancelarlo si el usuario vuelve a pasar el mouse
    const timeoutRef = useRef(null)

    // Cuando el mouse entra cancela el temporizador de cierre y abre el dropdown
    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current)
        setDropOpen(true)
    }

    // Cuando el mouse sale espera 200ms antes de cerrar
    // Así el usuario tiene tiempo de mover el mouse al dropdown sin que se cierre
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setDropOpen(false)
        }, 200)
    }

    // Cierra el dropdown al clickear un link
    const close = () => setDropOpen(false)

    return (
        <div
            className="nav-dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Link principal que también navega a /productos al clickear */}
            <NavLink to="/productos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Productos <i className="bi bi-chevron-down drop-icon"></i>
            </NavLink>

            {/* El dropdown solo se renderiza cuando está abierto */}
            {dropOpen && (
                <div className="dropdown-menu">

                    {/* Opción para ver todos los productos sin filtro */}
                    <NavLink to="/productos" className="dropdown-link-all" onClick={close}>
                        <i className="bi bi-grid"></i> Ver todos
                    </NavLink>

                    <div className="dropdown-divider-full"></div>

                    <div className="dropdown-cols">
                        {/* Columna de selecciones filtradas por confederación */}
                        <div className="dropdown-col">
                            <span className="dropdown-title">Selecciones</span>
                            <NavLink to="/productos?cat=selecciones" className="dropdown-link" onClick={close}>TODAS</NavLink>
                            <NavLink to="/productos?cat=selecciones&conf=UEFA" className="dropdown-link" onClick={close}>UEFA</NavLink>
                            <NavLink to="/productos?cat=selecciones&conf=CONMEBOL" className="dropdown-link" onClick={close}>CONMEBOL</NavLink>
                            <NavLink to="/productos?cat=selecciones&conf=AFC" className="dropdown-link" onClick={close}>AFC</NavLink>
                        </div>

                        {/* Divisor vertical entre las dos columnas */}
                        <div className="dropdown-divider"></div>

                        {/* Columna de clubes filtrados por confederación */}
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