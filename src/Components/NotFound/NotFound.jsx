import './NotFound.css'

const NotFound = () => {
    return (
        <div className="notfound">
            <div className="notfound-icon">
                <i className="bi bi-search"></i>
            </div>
            <h2 className="notfound-title">Sin resultados</h2>
            <p className="notfound-desc">
                No encontramos ningún jersey con ese nombre. <br />
                Probá con otro jugador o equipo.
            </p>
        </div>
    )
}

export default NotFound;