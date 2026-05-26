import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import products from '../../data/products.json'
import { useCart } from '../../Context/useCart'
import CartModal from '../CartModal/CartModal'
import './ItemDetailContainer.css'

const ItemDetailContainer = () => {
    const { id } = useParams()
    const [selectedImg, setSelectedImg] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [selectedSize, setSelectedSize] = useState(null)
    const [sizeError, setSizeError] = useState(false)
    const { addToCart } = useCart()

    const product = products.find(p => p.id === parseInt(id))

    if (!product) return null

    const handleAddToCart = () => {
        if (!selectedSize) {
            setSizeError(true)
            return
        }
        addToCart({ ...product, size: selectedSize })
        setShowModal(true)
        setSizeError(false)
    }

    return (
        <section className="detail-section">
            <div className="detail-inner">

                <Link to="/productos" className="detail-back">
                    <i className="bi bi-arrow-left"></i> Volver a productos
                </Link>

                <div className="detail-grid">

                    <div className="detail-images">
                        <div className="detail-main-img">
                            {product.images[selectedImg]
                                ? <img src={product.images[selectedImg]} alt={product.name} />
                                : <div className="detail-img-placeholder"><i className="bi bi-image"></i></div>
                            }
                        </div>
                        <div className="detail-thumbnails">
                            {product.images.map((img, i) => (
                                <div
                                    key={i}
                                    className={`detail-thumb ${selectedImg === i ? 'active' : ''}`}
                                    onClick={() => setSelectedImg(i)}
                                >
                                    <img src={img} alt={`${product.name} ${i + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="detail-info">
                        <span className="detail-team">{product.team}</span>
                        <h1 className="detail-name">{product.name}</h1>
                        <span className="detail-tournament">
                            <i className="bi bi-trophy"></i> {product.tournament}
                        </span>
                        <p className="detail-desc">{product.description}</p>
                        <div className="detail-tags">
                            <span className="detail-tag"><i className="bi bi-globe"></i> {product.confederation}</span>
                            <span className="detail-tag"><i className="bi bi-calendar3"></i> {product.year}</span>
                            <span className="detail-tag"><i className="bi bi-box"></i> {product.stock} disponibles</span>
                        </div>

                        <div className="detail-sizes">
                            <span className="detail-sizes-label">
                                Talle {sizeError && <span className="detail-sizes-error">— Seleccioná un talle</span>}
                            </span>
                            <div className="detail-sizes-options">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                        onClick={() => { setSelectedSize(size); setSizeError(false) }}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="detail-price">${product.price.toLocaleString('es-UY')}</div>
                        <button className="detail-btn" onClick={handleAddToCart}>
                            <i className="bi bi-bag-plus"></i> Agregar al carrito
                        </button>
                    </div>

                </div>
            </div>

            {showModal && <CartModal product={product} onClose={() => setShowModal(false)} />}

        </section>
    )
}

export default ItemDetailContainer