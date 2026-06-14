import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../service/firebase'
import ItemList from '../ItemList/ItemList'
import Loader from '../Loader/Loader'
import './ItemListContainer.css'

// Títulos que se muestran según el filtro activo
const titles = {
    default: 'Todos los jerseys',
    selecciones: 'Selecciones',
    clubes: 'Clubes',
}

const ItemListContainer = () => {
    // Lista de productos traídos de Firebase, arranca en null para mostrar el loader
    const [products, setProducts] = useState(null)
    // Controla si se muestra el loader o los productos
    const [loading, setLoading] = useState(true)
    // Lee los query params de la URL (?cat=clubes&conf=UEFA)
    const [searchParams] = useSearchParams()
    const cat  = searchParams.get('cat')
    const conf = searchParams.get('conf')
    // Guarda los params anteriores para detectar si cambiaron sin causar renders
    const prevParams = useRef({ cat, conf })

    useEffect(() => {
        const fetchProducts = async () => {
            // Si cambiaron los params muestra el loader y actualiza la referencia
            if (prevParams.current.cat !== cat || prevParams.current.conf !== conf) {
                setLoading(true)
                prevParams.current = { cat, conf }
            }
            // Trae todos los productos de la colección Item en Firebase
            const snapshot = await getDocs(collection(db, 'Item'))
            // Convierte los documentos de Firebase en objetos usando el id del documento
            const data = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setProducts(data)
            setLoading(false)
        }
        fetchProducts()
    }, [cat, conf]) // Se vuelve a ejecutar cada vez que cambia cat o conf

    // Mientras carga muestra el loader
    if (loading) return <Loader />

    // Filtra los productos según los params activos de la URL
    const filtered = products.filter(p => {
        const matchCat  = !cat  || p.category      === cat
        const matchConf = !conf || p.confederation === conf
        return matchCat && matchConf
    })

    // Título dinámico según el filtro activo
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