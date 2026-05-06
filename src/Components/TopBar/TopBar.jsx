import "./TopBar.css"

const TopBar = () => {
    
    return (
        <div className="topbar">
            <div className="topbar-inner">
                <div className="topbar-item">
                    <i className="bi bi-truck"></i> Envíos a todo el país
                </div>
                <div className="topbar-item">
                    <i className="bi bi-shield-check"></i> Pago 100% seguro
                </div>
                <div className="topbar-item">
                    <i className="bi bi-credit-card"></i> 3 y 6 cuotas sin interés
                </div>
            </div>
        </div>
    )
}

export default TopBar;