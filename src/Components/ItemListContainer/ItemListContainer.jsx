import products from '../../data/products.json'
import ItemList from '../ItemList/ItemList'
import './ItemListContainer.css'

const ItemListContainer = () => {
    return (
        <section className="ilc-section">
            <div className="ilc-header">
                <span className="ilc-tag">Nuestra colección</span>
                <h2 className="ilc-title">Todos los jerseys</h2>
            </div>
            <ItemList products={products} />
        </section>
    )
}

export default ItemListContainer;