import "./Hero.css"
import maradona from "../../assets/maradona.png"

const Hero = (() => {

    return(
<section className="hero">
            <div className="hero-bg"></div>
            <div className="hero-visual">
                <img src={maradona} alt="Maradona" className="hero-img" />
            </div>

            <div className="hero-inner">
                <div className="hero-text">
                    <span className="hero-tag">Pasión que trasciende generaciones</span>
                    <h1 className="hero-title">
                        <span>Jerseys vintage.</span>
                        <span>Historias eternas.</span>
                    </h1>
                    <p className="hero-desc">
                        Revive la historia del fútbol con camisetas originales de todas las épocas.
                    </p>
                </div>
            </div>
        </section>
    )
})

export default Hero;