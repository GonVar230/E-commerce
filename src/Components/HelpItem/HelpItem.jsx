import { useState } from 'react'
import './HelpItem.css'

const FAQItem = ({ question, answer }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className={`faq-item ${open ? 'open' : ''}`}>
            <button className="faq-question" onClick={() => setOpen(!open)}>
                <span>{question}</span>
                <i className={`bi ${open ? 'bi-dash' : 'bi-plus'}`}></i>
            </button>
            {open && <p className="faq-answer">{answer}</p>}
        </div>
    )
}

export default FAQItem;