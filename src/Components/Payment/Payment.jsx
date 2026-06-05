import { Link, useLocation, Navigate } from 'react-router-dom'
import usePayment from '../../hooks/usePayment'
import './Payment.css'

const Payment = () => {
    const { state } = useLocation()
    const { submitted, card, errors, handleCardChange, handleSubmit } = usePayment(state?.form || {})

    if (!state) return <Navigate to="/checkout" replace />

    const { form, total } = state

    if (submitted) {
        return (
            <section className="payment-section">
                <div className="payment-success">
                    <div className="success-icon">
                        <i className="bi bi-bag-check"></i>
                    </div>
                    <h2 className="success-title">¡Pedido confirmado!</h2>
                    <p className="success-desc">Gracias {form.nombre}, te enviamos los detalles a {form.email}.</p>
                    <Link to="/" className="success-btn">Volver al inicio</Link>
                </div>
            </section>
        )
    }

    return (
        <section className="payment-section">
            <div className="payment-inner">

                <Link to="/checkout" className="payment-back">
                    <i className="bi bi-arrow-left"></i> Volver
                </Link>

                {form.pago === 'visa' && (
                    <>
                        <h2 className="payment-title">Datos de tu tarjeta</h2>
                        <div className="payment-form">
                            <div className="form-group">
                                <label>Número de tarjeta</label>
                                <input name="numero" value={card.numero} onChange={handleCardChange} placeholder="1234 5678 9012 3456" maxLength={19} />
                                {errors.numero && <span className="form-error">{errors.numero}</span>}
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Vencimiento</label>
                                    <input name="vencimiento" value={card.vencimiento} onChange={handleCardChange} placeholder="MM/AA" maxLength={5} />
                                    {errors.vencimiento && <span className="form-error">{errors.vencimiento}</span>}
                                </div>
                                <div className="form-group">
                                    <label>CVV</label>
                                    <input name="cvv" value={card.cvv} onChange={handleCardChange} placeholder="123" maxLength={3} />
                                    {errors.cvv && <span className="form-error">{errors.cvv}</span>}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Nombre en la tarjeta</label>
                                <input name="titular" value={card.titular} onChange={handleCardChange} placeholder="JUAN GARCIA" />
                                {errors.titular && <span className="form-error">{errors.titular}</span>}
                            </div>
                        </div>
                    </>
                )}

                {form.pago === 'mercadopago' && (
                    <>
                        <h2 className="payment-title">Pagar con MercadoPago</h2>
                        <div className="payment-info">
                            <div className="payment-info-icon"><i className="bi bi-phone"></i></div>
                            <p>Al confirmar serás redirigido a MercadoPago para completar el pago de forma segura.</p>
                            <span className="payment-info-total">${total.toLocaleString('es-UY')}</span>
                        </div>
                    </>
                )}

                {form.pago === 'transferencia' && (
                    <>
                        <h2 className="payment-title">Datos para transferencia</h2>
                        <div className="payment-info">
                            <div className="payment-info-icon"><i className="bi bi-bank"></i></div>
                            <div className="transfer-data">
                                <div className="transfer-row"><span>Banco</span><span>Santander Uruguay</span></div>
                                <div className="transfer-row"><span>Titular</span><span>Vintage Jerseys SRL</span></div>
                                <div className="transfer-row"><span>Cuenta</span><span>001-123456/78</span></div>
                                <div className="transfer-row"><span>Total</span><span className="transfer-total">${total.toLocaleString('es-UY')}</span></div>
                            </div>
                        </div>
                    </>
                )}

                {form.pago === 'paypal' && (
                    <>
                        <h2 className="payment-title">Pagar con PayPal</h2>
                        <div className="payment-info">
                            <div className="payment-info-icon"><i className="bi bi-paypal"></i></div>
                            <p>Al confirmar serás redirigido a PayPal para completar el pago de forma segura.</p>
                            <span className="payment-info-total">${total.toLocaleString('es-UY')}</span>
                        </div>
                    </>
                )}

                <button className="payment-btn" onClick={handleSubmit}>
                    <i className="bi bi-lock"></i> Confirmar pedido
                </button>

            </div>
        </section>
    )
}

export default Payment;