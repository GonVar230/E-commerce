import { Link } from 'react-router-dom'
import './Item.css'

const Item = ({ product }) => {
    return (
        <div className="item-card">
            <div className="item-img">
                {product.images[0]
                    ? <img src={product.images[0]} alt={product.name} />
                    : <div className="item-img-placeholder"><i className="bi bi-image"></i></div>
                }
                <span className="item-badge">{product.confederation}</span>
            </div>
            <div className="item-info">
                <span className="item-team">{product.team}</span>
                <h3 className="item-name">{product.name}</h3>
                <div className="item-footer">
                    <span className="item-price">${product.price.toLocaleString('es-UY')}</span>
                    <div className="item-actions">
                        <button className="item-cart-btn">
                            <i className="bi bi-bag-plus"></i>
                        </button>
                        <Link to={`/productos/${product.id}`} className="item-detail-btn">
                            Ver detalles
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item;