const PaypalInfo = ({ total, onSubmit }) => {
    return (
        <>
            <h2 className="payment-title">Pagar con PayPal</h2>
            <div className="payment-info">
                <div className="payment-info-icon"><i className="bi bi-paypal"></i></div>
                <p>Al confirmar serás redirigido a PayPal para completar el pago de forma segura.</p>
                <span className="payment-info-total">${total.toLocaleString('es-UY')}</span>
            </div>

            <button className="payment-btn" onClick={onSubmit}>
                <i className="bi bi-lock"></i> Confirmar pedido
            </button>
        </>
    )
}

export default PaypalInfo;