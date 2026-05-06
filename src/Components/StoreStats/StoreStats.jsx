import './StoreStats.css'

const stats = [
    { icon: 'bi-trophy',        value: '200+',   label: 'Jerseys únicos',       desc: 'Piezas originales de todas las épocas'     },
    { icon: 'bi-people',        value: '4230', label: 'Clientes satisfechos', desc: 'En toda Uruguay'            },
    { icon: 'bi-patch-check',   value: '100%',   label: 'Autenticidad',         desc: 'Certificado de originalidad en cada pieza' },
]

const StoreStats = () => {
    return (
        <section className="stats-section">

            <div className="stats-header">
                <span className="stats-tag">Números que hablan</span>
                <h2 className="stats-title">La tienda en la que confían</h2>
                <p className="stats-desc">Más de una década conectando a fanáticos del fútbol con la historia del deporte.</p>
            </div>

            <div className="stats-grid">
                {stats.map((stat, i) => (
                    <div className="stat-card" key={i}>
                        <div className="stat-icon">
                            <i className={`bi ${stat.icon}`}></i>
                        </div>
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                        <div className="stat-desc">{stat.desc}</div>
                    </div>
                ))}
            </div>

        </section>
    )
}

export default StoreStats;