const MercadoPagoInfo = ({ total, onSubmit }) => {
    return (
        <>
            <h2 className="payment-title">Pagar con MercadoPago</h2>
            <div className="payment-info">
                <div className="payment-info-icon"><i className="bi bi-phone"></i></div>
                <p>Al confirmar serás redirigido a MercadoPago para completar el pago de forma segura.</p>
                <span className="payment-info-total">${total.toLocaleString('es-UY')}</span>
            </div>

            <button className="payment-btn" onClick={onSubmit}>
                <i className="bi bi-lock"></i> Confirmar pedido
            </button>
        </>
    )
}

export default MercadoPagoInfo;