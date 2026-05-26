import { useCart } from '../../Context/useCart'
import { Link } from 'react-router-dom'
import './Cart.css'

const Cart = () => {
    const { cart, removeFromCart } = useCart()

    const total = cart.reduce((acc, item) => acc + item.price, 0)

    return (
        <section className="cart-section">
            <div className="cart-inner">

                <Link to="/productos" className="cart-back">
                    <i className="bi bi-arrow-left"></i> Volver a productos
                </Link>

                <h2 className="cart-title">Tu carrito</h2>

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
                                        <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
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
                            <button className="cart-checkout-btn">
                                <i className="bi bi-bag-check"></i> Finalizar compra
                            </button>
                        </div>
                    </>
                )}

            </div>
        </section>
    )
}

export default Cart;