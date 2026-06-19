const TransferenciaInfo = ({ total, onSubmit }) => {
    return (
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

            <button className="payment-btn" onClick={onSubmit}>
                <i className="bi bi-lock"></i> Confirmar pedido
            </button>
        </>
    )
}

export default TransferenciaInfo;