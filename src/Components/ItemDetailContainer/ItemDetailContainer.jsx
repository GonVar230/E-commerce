import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../service/firebase'
import CartModal from '../CartModal/CartModal'
import useItemDetail from '../../hooks/useItemDetail'
import './ItemDetailContainer.css'
import Loader from '../Loader/Loader'

const ItemDetailContainer = () => {
    // Obtiene el id del producto desde la URL (/productos/:id)
    const { id } = useParams()

    // Guarda el producto traído de Firebase, arranca en null para mostrar el loader
    const [product, setProduct] = useState(null)

    useEffect(() => {
        // Referencia al documento en la colección Item con el id de la URL
        const itemRef = doc(db, 'Item', id)

        getDoc(itemRef)
            .then((docSnapshot) => {
                // Si el documento no existe corta sin hacer nada
                if (!docSnapshot.exists()) {
                    return
                }

                // Arma el objeto del producto con el id del documento y sus datos
                const productData = {
                    id: docSnapshot.id,
                    ...docSnapshot.data()
                }

                setProduct(productData)
            })
            .catch((error) => {
                console.log(error)
            })

    }, [id]) // Se vuelve a ejecutar si cambia el id en la URL

    // Inicializa el hook con el producto, si todavía no cargó usa objeto vacío
    // para no romper las reglas de los hooks
    const itemDetail = useItemDetail(product || {})

    // Mientras el producto no cargó muestra el loader
    if (!product) {
        return <Loader />
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
                            {/* Muestra la imagen seleccionada o un placeholder si no tiene */}
                            {product.images?.[itemDetail.selectedImg]
                                ? (
                                    <img
                                        src={product.images[itemDetail.selectedImg]}
                                        alt={product.name}
                                    />
                                )
                                : (
                                    <div className="detail-img-placeholder">
                                        <i className="bi bi-image"></i>
                                    </div>
                                )
                            }
                        </div>

                        {/* Miniaturas de todas las imágenes del producto */}
                        <div className="detail-thumbnails">
                            {product.images?.map((img, index) => (
                                <div
                                    key={index}
                                    // Agrega la clase active a la miniatura seleccionada
                                    className={`detail-thumb ${
                                        itemDetail.selectedImg === index ? 'active' : ''
                                    }`}
                                    onClick={() => itemDetail.setSelectedImg(index)}
                                >
                                    <img
                                        src={img}
                                        alt={`${product.name} ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="detail-info">

                        <span className="detail-team">{product.team}</span>
                        <h1 className="detail-name">{product.name}</h1>

                        <span className="detail-tournament">
                            <i className="bi bi-trophy"></i>
                            {product.tournament}
                        </span>

                        <p className="detail-desc">{product.description}</p>

                        <div className="detail-tags">
                            <span className="detail-tag">
                                <i className="bi bi-globe"></i>
                                {product.confederation}
                            </span>
                            <span className="detail-tag">
                                <i className="bi bi-calendar3"></i>
                                {product.year}
                            </span>
                        </div>

                        <div className="detail-sizes">
                            <span className="detail-sizes-label">
                                Talle
                                {/* Muestra el error si el usuario intenta agregar sin elegir talle */}
                                {itemDetail.sizeError && (
                                    <span className="detail-sizes-error">
                                        — Seleccioná un talle
                                    </span>
                                )}
                            </span>

                            <div className="detail-sizes-options">
                                {product.sizes?.map((sizeInfo) => (
                                    <button
                                        key={sizeInfo.size}
                                        className={`size-btn ${
                                            // Agrega clase active al talle seleccionado
                                            itemDetail.selectedSize === sizeInfo.size
                                                ? 'active'
                                                : ''
                                        } ${
                                            // Agrega clase disabled si el talle no tiene stock
                                            // o si ya se agregó la cantidad máxima al carrito
                                            itemDetail.isSizeDisabled(
                                                sizeInfo.size,
                                                sizeInfo.stock
                                            )
                                                ? 'disabled'
                                                : ''
                                        }`}
                                        onClick={() =>
                                            itemDetail.handleSizeSelect(
                                                sizeInfo.size,
                                                sizeInfo.stock
                                            )
                                        }
                                        disabled={itemDetail.isSizeDisabled(
                                            sizeInfo.size,
                                            sizeInfo.stock
                                        )}
                                    >
                                        {sizeInfo.size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Precio formateado en pesos uruguayos  */}
                        <div className="detail-price">
                            ${product.price?.toLocaleString('es-UY')}
                        </div>

                        {/* Botón deshabilitado si no hay talle seleccionado */}
                        <button
                            className={`detail-btn ${
                                itemDetail.isCartDisabled ? 'disabled' : ''
                            }`}
                            onClick={itemDetail.handleAddToCart}
                            disabled={itemDetail.isCartDisabled}
                        >
                            <i className="bi bi-bag-plus"></i>
                            Agregar al carrito
                        </button>

                    </div>

                </div>

            </div>

            {/* Modal de confirmación que aparece al agregar un producto al carrito */}
            {itemDetail.showModal && (
                <CartModal
                    product={product}
                    onClose={() => itemDetail.setShowModal(false)}
                />
            )}
        </section>
    )
}

export default ItemDetailContainer;