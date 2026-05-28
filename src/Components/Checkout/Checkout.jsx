import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../Context/useCart'
import './Checkout.css'

const Checkout = () => {
    const { cart } = useCart()
    const total = cart.reduce((acc, item) => acc + item.price, 0)

    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        direccion: '',
        ciudad: '',
        pago: ''
    })

    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: '' })
    }

    const validate = () => {
        const newErrors = {}
        if (!form.nombre)    newErrors.nombre    = 'Campo requerido'
        if (!form.apellido)  newErrors.apellido  = 'Campo requerido'
        if (!form.email)     newErrors.email     = 'Campo requerido'
        if (!form.telefono)  newErrors.telefono  = 'Campo requerido'
        if (!form.direccion) newErrors.direccion = 'Campo requerido'
        if (!form.ciudad)    newErrors.ciudad    = 'Campo requerido'
        if (!form.pago)      newErrors.pago      = 'Seleccioná un método de pago'
        return newErrors
    }

    const handleSubmit = () => {
        const newErrors = validate()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <section className="checkout-section">
                <div className="checkout-success">
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
        <section className="checkout-section">
            <div className="checkout-inner">

                <Link to="/carrito" className="checkout-back">
                    <i className="bi bi-arrow-left"></i> Volver al carrito
                </Link>

                <div className="checkout-grid">

                    <div className="checkout-form">
                        <h2 className="checkout-title">Datos de envío</h2>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Nombre</label>
                                <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Juan" />
                                {errors.nombre && <span className="form-error">{errors.nombre}</span>}
                            </div>
                            <div className="form-group">
                                <label>Apellido</label>
                                <input name="apellido" value={form.apellido} onChange={handleChange} placeholder="García" />
                                {errors.apellido && <span className="form-error">{errors.apellido}</span>}
                            </div>
                        </div>

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

                        <div className="payment-options">
                            {[
                                { value: 'visa',          label: 'Visa / Mastercard', icon: 'bi-credit-card' },
                                { value: 'mercadopago',   label: 'MercadoPago',       icon: 'bi-phone'       },
                                { value: 'transferencia', label: 'Transferencia',     icon: 'bi-bank'        },
                                { value: 'paypal',        label: 'PayPal',            icon: 'bi-paypal'      },
                            ].map(opt => (
                                <label
                                    key={opt.value}
                                    className={`payment-option ${form.pago === opt.value ? 'active' : ''}`}
                                >
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
                        <button className="checkout-btn" onClick={handleSubmit}>
                            <i className="bi bi-lock"></i> Confirmar pedido
                        </button>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Checkout;