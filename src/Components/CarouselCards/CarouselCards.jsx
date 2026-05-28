import './CarouselCards.css'

const jerseys = [
    { number: '10', team: 'Argentina', year: '1986', player: 'Maradona',   desc: 'La camiseta del gol del siglo. Mundial México 86.',       color: '#1a3d2e' },
    { number: '10', team: 'Brasil',    year: '1994', player: 'Ronaldo',    desc: 'El fenómeno en su primera copa del mundo. USA 94.',       color: '#1a2e1a' },
    { number: '7',  team: 'Portugal', year: '2006', player: 'Figo',       desc: 'La última gran copa de Figo con Portugal. Alemania 06.',  color: '#2e1a1a' },
    { number: '10', team: 'Francia',  year: '1998', player: 'Zidane',     desc: 'Zidane campeón del mundo en casa. Francia 98.',           color: '#1a1a2e' },
    { number: '9',  team: 'Holanda',  year: '1988', player: 'Van Basten', desc: 'El gol de volea más famoso de la historia. Euro 88.',     color: '#2e1e1a' },
    { number: '10', team: 'Italia',   year: '1982', player: 'Rossi',      desc: 'Paolo Rossi, Bota de Oro del Mundial de España.',         color: '#1a2a2e' },
    { number: '11', team: 'Alemania', year: '1990', player: 'Klinsmann',  desc: 'Campeones del mundo en Italia. Una generación dorada.',   color: '#2a2a1a' },
    { number: '10', team: 'Uruguay',  year: '1950', player: 'Schiaffino', desc: 'El Maracanazo. La hazaña más grande del fútbol.',         color: '#1a2e2a' },
]

const CarouselCards = () => {
    const doubled = [...jerseys, ...jerseys]

    return (
        <section className="carousel-section">
            <div className="carousel-header">
                <span className="carousel-tag">Piezas históricas</span>
                <h2 className="carousel-title">Próximos Ingresos</h2>
            </div>
            <div className="carousel-wrapper">
                <div className="carousel-track">
                    {doubled.map((jersey, i) => (
                        <div className="carousel-card" key={i}>
                            <div className="card-inner">

                                <div className="card-front" style={{ background: `linear-gradient(135deg, ${jersey.color}, #0d0d0d)` }}>
                                    <div className="card-number">{jersey.number}</div>
                                    <div className="card-info">
                                        <span className="card-team">{jersey.team}</span>
                                        <span className="card-year">{jersey.year}</span>
                                    </div>
                                    <div className="card-hover-hint">
                                        <i className="bi bi-arrow-repeat"></i>
                                    </div>
                                </div>

                                <div className="card-back" style={{ background: `linear-gradient(135deg, #0d0d0d, ${jersey.color})` }}>
                                    <span className="card-back-team">{jersey.team}</span>
                                    <h3 className="card-player">{jersey.player}</h3>
                                    <p className="card-desc">{jersey.desc}</p>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CarouselCards;