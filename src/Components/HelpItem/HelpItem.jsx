import { useState } from 'react'
import './HelpItem.css'

const FAQItem = ({ question, answer }) => {
    // Controla si la pregunta está abierta o cerrada
    const [open, setOpen] = useState(false)

    return (
        // Agrega la clase 'open' cuando está expandida para cambiar el estilo
        <div className={`faq-item ${open ? 'open' : ''}`}>
            {/* Al clickear alterna entre abierto y cerrado */}
            <button className="faq-question" onClick={() => setOpen(!open)}>
                <span>{question}</span>
                {/* Cambia el ícono según si está abierto o cerrado */}
                <i className={`bi ${open ? 'bi-dash' : 'bi-plus'}`}></i>
            </button>
            {/* Muestra la respuesta solo cuando está abierta */}
            {open && <p className="faq-answer">{answer}</p>}
        </div>
    )
}

export default FAQItem;