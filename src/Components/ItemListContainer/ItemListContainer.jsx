import { useSearchParams } from 'react-router-dom'
import products from '../../data/products.json'
import ItemList from '../ItemList/ItemList'
import './ItemListContainer.css'

const titles = {
    default: 'Todos los jerseys',
    selecciones: 'Selecciones',
    clubes: 'Clubes',
}

const ItemListContainer = () => {
    const [searchParams] = useSearchParams()
    const cat  = searchParams.get('cat')
    const conf = searchParams.get('conf')

    const filtered = products.filter(p => {
        const matchCat  = !cat  || p.category      === cat
        const matchConf = !conf || p.confederation === conf
        return matchCat && matchConf
    })

    const title = conf ? conf : cat ? titles[cat] : titles.default

    return (
        <section className="ilc-section">
            <div className="ilc-header">
                <span className="ilc-tag">Nuestra colección</span>
                <h2 className="ilc-title">{title}</h2>
            </div>
            <ItemList products={filtered} />
        </section>
    )
}

export default ItemListContainer;