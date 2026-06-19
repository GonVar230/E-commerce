import { Link, useLocation, Navigate } from 'react-router-dom'
import usePayment from '../../hooks/usePayment'
import CardPaymentForm from './CardPaymentForm'
import MercadoPagoInfo from './MercadoPagoInfo'
import TransferenciaInfo from './TransferenciaInfo'
import PaypalInfo from './PaypalInfo'
import './Payment.css'

const Payment = () => {
    const { state } = useLocation()
    const { submitted, orderId, register, errors, setValue, onSubmit } = usePayment(state?.form || {}, state?.total || 0)

    if (!state) return <Navigate to="/checkout" replace />

    const { form, total } = state

    // Formatea el vencimiento automáticamente mientras el usuario escribe (MM/AA)
    const handleVencimientoChange = (e) => {
        let value = e.target.value.replace(/\D/g, '')
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4)
        }
        setValue('vencimiento', value, { shouldValidate: true })
    }

    if (submitted) {
        return (
            <section className="payment-section">
                <div className="payment-success">
                    <div className="success-icon">
                        <i className="bi bi-bag-check"></i>
                    </div>
                    <h2 className="success-title">¡Pedido confirmado!</h2>
                    <p className="success-desc">Gracias {form.nombre}, te enviamos los detalles a {form.email}.</p>
                    <div className="order-id">
                        <span>Número de pedido</span>
                        <strong>{orderId}</strong>
                    </div>
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

                {/* Renderiza el componente correspondiente según el método de pago elegido */}
                {form.pago === 'visa' && (
                    <CardPaymentForm
                        register={register}
                        errors={errors}
                        onSubmit={onSubmit}
                        handleVencimientoChange={handleVencimientoChange}
                    />
                )}

                {form.pago === 'mercadopago' && (
                    <MercadoPagoInfo total={total} onSubmit={onSubmit} />
                )}

                {form.pago === 'transferencia' && (
                    <TransferenciaInfo total={total} onSubmit={onSubmit} />
                )}

                {form.pago === 'paypal' && (
                    <PaypalInfo total={total} onSubmit={onSubmit} />
                )}

            </div>
        </section>
    )
}

export default Payment;