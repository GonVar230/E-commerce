import './CartModal.css'

const CartModal = ({ product, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-icon">
                    <i className="bi bi-bag-check"></i>
                </div>
                <h3 className="modal-title">¡Agregado al carrito!</h3>
                <p className="modal-product">{product.name}</p>
                <p className="modal-team">{product.team} · {product.year}</p>
                <div className="modal-price">${product.price.toLocaleString('es-UY')}</div>
                <button className="modal-btn" onClick={onClose}>
                    Seguir comprando
                </button>
            </div>
        </div>
    )
}

export default CartModal;