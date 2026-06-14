import { Link } from 'react-router-dom'
import useCheckout from '../../hooks/useCheckout'
import './Checkout.css'

const Checkout = () => {
    // Trae toda la lógica del formulario desde el hook useCheckout
    const { cart, total, form, errors, handleChange, handleContinue } = useCheckout()

    return (
        <section className="checkout-section">
            <div className="checkout-inner">

                {/* Botón para volver al carrito */}
                <Link to="/carrito" className="checkout-back">
                    <i className="bi bi-arrow-left"></i> Volver al carrito
                </Link>

                <div className="checkout-grid">

                    <div className="checkout-form">
                        <h2 className="checkout-title">Datos de envío</h2>

                        {/* Fila con nombre y apellido */}
                        <div className="form-row">
                            <div className="form-group">
                                <label>Nombre</label>
                                <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Juan" />
                                {/* Muestra el error solo si existe */}
                                {errors.nombre && <span className="form-error">{errors.nombre}</span>}
                            </div>
                            <div className="form-group">
                                <label>Apellido</label>
                                <input name="apellido" value={form.apellido} onChange={handleChange} placeholder="García" />
                                {errors.apellido && <span className="form-error">{errors.apellido}</span>}
                            </div>
                        </div>

                        {/* Fila con email y teléfono */}
                        <div className="form-row">
                            <div className="form-group">
                                <label>Email</label>
                                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="juan@email.com" />
                                {errors.email && <span className="form-error">{errors.email}</span>}
                            </div>
                            <div className="form-group">
                                <label>Teléfono</label>
                                <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="+598 99 000 000" />
                                {errors.telefono && <span className="form-error">{errors.telefono}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Dirección</label>
                            <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Av. Brasil" />
                            {errors.direccion && <span className="form-error">{errors.direccion}</span>}
                        </div>

                        <div className="form-group">
                            <label>Ciudad</label>
                            <input name="ciudad" value={form.ciudad} onChange={handleChange} placeholder="Montevideo" />
                            {errors.ciudad && <span className="form-error">{errors.ciudad}</span>}
                        </div>

                        <h2 className="checkout-title" style={{ marginTop: '32px' }}>Método de pago</h2>

                        {/* Opciones de método de pago generadas dinámicamente desde un array */}
                        <div className="payment-options">
                            {[
                                { value: 'visa',          label: 'Visa / Mastercard', icon: 'bi-credit-card' },
                                { value: 'mercadopago',   label: 'MercadoPago',       icon: 'bi-phone'       },
                                { value: 'transferencia', label: 'Transferencia',     icon: 'bi-bank'        },
                                { value: 'paypal',        label: 'PayPal',            icon: 'bi-paypal'      },
                            ].map(opt => (
                                <label
                                    key={opt.value}
                                    // Agrega la clase active cuando el método está seleccionado
                                    className={`payment-option ${form.pago === opt.value ? 'active' : ''}`}
                                >
                                    {/* Radio oculto que maneja la selección */}
                                    <input
                                        type="radio"
                                        name="pago"
                                        value={opt.value}
                                        checked={form.pago === opt.value}
                                        onChange={handleChange}
                                    />
                                    <i className={`bi ${opt.icon}`}></i>
                                    <span>{opt.label}</span>
                                </label>
                            ))}
                        </div>
                        {errors.pago && <span className="form-error">{errors.pago}</span>}
                    </div>

                    {/* Resumen del pedido con los productos del carrito */}
                    <div className="checkout-summary">
                        <h3 className="summary-title">Resumen del pedido</h3>
                        <div className="summary-items">
                            {cart.map((item, i) => (
                                <div className="summary-item" key={i}>
                                    <div className="summary-item-img">
                                        <img src={item.images[0]} alt={item.name} />
                                    </div>
                                    <div className="summary-item-info">
                                        <span className="summary-item-name">{item.name}</span>
                                        <span className="summary-item-detail">Talle {item.size}</span>
                                    </div>
                                    <span className="summary-item-price">${item.price.toLocaleString('es-UY')}</span>
                                </div>
                            ))}
                        </div>
                        {/* Total calculado en el hook sumando el precio de cada item */}
                        <div className="summary-total">
                            <span>Total</span>
                            <span className="summary-total-price">${total.toLocaleString('es-UY')}</span>
                        </div>
                        {/* Al clickear valida el formulario y navega a /pago si todo está ok */}
                        <button className="checkout-btn" onClick={handleContinue}>
                            <i className="bi bi-arrow-right"></i> Continuar al pago
                        </button>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Checkout;