import faqs from '../../data/faqs.json'
import HelpItem from '../HelpItem/HelpItem'
import './Help.css'

const Help = () => {

    return (
        <section className="faq-section">
            <div className="faq-inner">

                <div className="faq-header">
                    <span className="faq-tag">Todo lo que necesitás saber</span>
                    <h2 className="faq-title">Preguntas frecuentes</h2>
                    <p className="faq-desc">Si no encontrás lo que buscás escribinos y te respondemos a la brevedad.</p>
                </div>

                <div className="faq-grid">
                    {faqs.map(block => (
                        <div className="faq-block" key={block.id}>
                            <div className="faq-block-header">
                                <div className="faq-block-icon">
                                    <i className={`bi ${block.icon}`}></i>
                                </div>
                                <h3 className="faq-block-title">{block.category}</h3>
                            </div>
                            {block.questions.map((item, j) => (
                                <HelpItem key={j} question={item.q} answer={item.a} />
                            ))}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Help