import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-top">

                <div className="footer-brand">
                    <div className="footer-logo">
                        <div className="footer-logo-icon">
                            <i className="bi bi-trophy"></i>
                        </div>
                        <div className="footer-logo-text">
                            <span className="footer-logo-brand">VINTAGE</span>
                            <span className="footer-logo-sub">JERSEYS</span>
                        </div>
                    </div>
                    <p className="footer-brand-desc">
                        Conectamos fanáticos del fútbol con la historia del deporte. Cada camiseta tiene una historia.
                    </p>
                </div>

                <div className="footer-col">
                    <h4 className="footer-col-title">Ayuda</h4>
                    <ul className="footer-list">
                        <li><Link to="/ayuda">Envíos</Link></li>
                        <li><Link to="/ayuda">Guía de tallas</Link></li>
                        <li><Link to="/ayuda">Devoluciones</Link></li>
                        <li><Link to="/ayuda">Autenticidad</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4 className="footer-col-title">Contacto</h4>
                    <ul className="footer-contact-list">
                        <li>
                            <i className="bi bi-geo-alt"></i>
                            <span>Av. Roosevelt, Punta del Este</span>
                        </li>
                        <li>
                            <i className="bi bi-envelope"></i>
                            <span>hola@vintagejerseys.com</span>
                        </li>
                        <li>
                            <i className="bi bi-whatsapp"></i>
                            <span>+54 11 1234-5678</span>
                        </li>
                        <li>
                            <i className="bi bi-clock"></i>
                            <span>Lun - Vie, 9:00 a 18:00</span>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="footer-bottom">
                <p className="footer-copy">© 2026 Vintage Jerseys. Todos los derechos reservados.</p>
            </div>

        </footer>
    )
}

export default Footer