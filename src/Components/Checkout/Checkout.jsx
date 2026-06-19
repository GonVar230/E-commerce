import { Link } from 'react-router-dom'
import useCheckout from '../../hooks/useCheckout'
import './Checkout.css'

const Checkout = () => {
    const { cart, total, loading, register, errors, pagoSeleccionado, onSubmit } = useCheckout()

    return (
        <section className="checkout-section">
            <div className="checkout-inner">

                <Link to="/carrito" className="checkout-back">
                    <i className="bi bi-arrow-left"></i> Volver al carrito
                </Link>

                <div className="checkout-grid">

                    <form className="checkout-form" onSubmit={onSubmit}>
                        <h2 className="checkout-title">Datos de envío</h2>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Nombre</label>
                                <input
                                    placeholder="Juan"
                                    {...register('nombre', {
                                        required: 'Campo requerido',
                                        pattern: {
                                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
                                            message: 'Solo letras'
                                        }
                                    })}
                                />
                                {errors.nombre && <span className="form-error">{errors.nombre.message}</span>}
                            </div>
                            <div className="form-group">
                                <label>Apellido</label>
                                <input
                                    placeholder="García"
                                    {...register('apellido', {
                                        required: 'Campo requerido',
                                        pattern: {
                                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
                                            message: 'Solo letras'
                                        }
                                    })}
                                />
                                {errors.apellido && <span className="form-error">{errors.apellido.message}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="juan@email.com"
                                    {...register('email', {
                                        required: 'Campo requerido',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Email inválido'
                                        }
                                    })}
                                />
                                {errors.email && <span className="form-error">{errors.email.message}</span>}
                            </div>
                            <div className="form-group">
                                <label>Teléfono</label>
                                <input
                                    placeholder="+598 99 000 000"
                                    {...register('telefono', {
                                        required: 'Campo requerido',
                                        minLength: { value: 8, message: 'Teléfono inválido' },
                                        pattern: {
                                            value: /^\d*$/,
                                            message: 'Solo números'
                                        }
                                    })}
                                />
                                {errors.telefono && <span className="form-error">{errors.telefono.message}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Dirección</label>
                            <input
                                placeholder="Av. Brasil"
                                {...register('direccion', {
                                    required: 'Campo requerido',
                                    pattern: {
                                        value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]*$/,
                                        message: 'Dirección inválida'
                                    }
                                })}
                            />
                            {errors.direccion && <span className="form-error">{errors.direccion.message}</span>}
                        </div>

                        <div className="form-group">
                            <label>Ciudad</label>
                            <input
                                placeholder="Montevideo"
                                {...register('ciudad', {
                                    required: 'Campo requerido',
                                    pattern: {
                                        value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
                                        message: 'Solo letras'
                                    }
                                })}
                            />
                            {errors.ciudad && <span className="form-error">{errors.ciudad.message}</span>}
                        </div>

                        <h2 className="checkout-title" style={{ marginTop: '32px' }}>Método de pago</h2>

                        <div className="payment-options">
                            {[
                                { value: 'visa',          label: 'Visa / Mastercard', icon: 'bi-credit-card' },
                                { value: 'mercadopago',   label: 'MercadoPago',       icon: 'bi-phone'       },
                                { value: 'transferencia', label: 'Transferencia',     icon: 'bi-bank'        },
                                { value: 'paypal',        label: 'PayPal',            icon: 'bi-paypal'      },
                            ].map(opt => (
                                <label
                                    key={opt.value}
                                    className={`payment-option ${pagoSeleccionado === opt.value ? 'active' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        value={opt.value}
                                        {...register('pago', { required: 'Seleccioná un método de pago' })}
                                    />
                                    <i className={`bi ${opt.icon}`}></i>
                                    <span>{opt.label}</span>
                                </label>
                            ))}
                        </div>
                        {errors.pago && <span className="form-error">{errors.pago.message}</span>}

                        <button
                            type="submit"
                            className="checkout-btn"
                            style={{ marginTop: '24px' }}
                            disabled={loading}
                        >
                            {loading
                                ? <><div className="btn-spinner"></div> Procesando...</>
                                : <><i className="bi bi-arrow-right"></i> Continuar al pago</>
                            }
                        </button>
                    </form>

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
                        <div className="summary-total">
                            <span>Total</span>
                            <span className="summary-total-price">${total.toLocaleString('es-UY')}</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Checkout;