import './Loader.css'

const Loader = () => {
    return (
        <div className="loader-overlay">
            <div className="loader-spinner"></div>
            <span className="loader-text">Cargando jerseys...</span>
        </div>
    )
}

export default Loader;