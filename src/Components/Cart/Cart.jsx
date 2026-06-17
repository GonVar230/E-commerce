import { useCart } from '../../Context/useCart'
import { Link } from 'react-router-dom'
import './Cart.css'

const Cart = () => {
    // Trae el carrito y la función para eliminar productos del contexto
    const { cart, removeFromCart } = useCart()

    // Calcula el total sumando el precio de cada item del carrito
    const total = cart.reduce((acc, item) => acc + item.price, 0)

    return (
        <section className="cart-section">
            <div className="cart-inner">

                <Link to="/productos" className="cart-back">
                    <i className="bi bi-arrow-left"></i> Volver a productos
                </Link>

                <h2 className="cart-title">Tu carrito</h2>

                {/* Si el carrito está vacío muestra un mensaje, si tiene productos muestra la lista */}
                {cart.length === 0 ? (
                    <div className="cart-empty">
                        <i className="bi bi-bag"></i>
                        <p>Tu carrito está vacío</p>
                        <Link to="/productos" className="cart-empty-btn">Ver productos</Link>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cart.map((item, i) => (
                                <div className="cart-item" key={i}>
                                    <div className="cart-item-img">
                                        {/* Muestra la imagen del producto o un ícono si no tiene */}
                                        {item.images[0]
                                            ? <img src={item.images[0]} alt={item.name} />
                                            : <i className="bi bi-image"></i>
                                        }
                                    </div>
                                    <div className="cart-item-info">
                                        <span className="cart-item-team">{item.team}</span>
                                        <p className="cart-item-name">{item.name}</p>
                                        <span className="cart-item-tournament">{item.tournament}</span>
                                        <span className="cart-item-size">Talle: {item.size}</span>
                                    </div>
                                    <div className="cart-item-right">
                                        <span className="cart-item-price">${item.price.toLocaleString('es-UY')}</span>
                                        {/* Elimina el item por id y talle para no borrar otros talles del mismo producto */}
                                        <button className="cart-item-remove" onClick={() => removeFromCart(item.id, item.size)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-footer">
                            <div className="cart-total">
                                <span>Total</span>
                                <span className="cart-total-price">${total.toLocaleString('es-UY')}</span>
                            </div>
                            {/* Navega a /checkout para completar los datos de envío y pago */}
                            <Link to="/checkout" className="cart-checkout-btn">
                                <i className="bi bi-bag-check"></i> Finalizar compra
                            </Link>
                        </div>
                    </>
                )}

            </div>
        </section>
    )
}

export default Cart;