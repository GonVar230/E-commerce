import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../service/firebase'

const useSearchBar = () => {
    // Controla si la barra de búsqueda está abierta o cerrada
    const [open, setOpen] = useState(false)
    // Guarda lo que el usuario está escribiendo
    const [query, setQuery] = useState('')
    // Guarda todos los productos traídos de Firebase
    const [products, setProducts] = useState([])
    // Para navegar a otra ruta
    const navigate = useNavigate()

    // Trae todos los productos de Firebase una sola vez al montar
    useEffect(() => {
        const fetchProducts = async () => {
            const snapshot = await getDocs(collection(db, 'Item'))
            const data = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setProducts(data)
        }
        fetchProducts()
    }, [])

    // Bloquea el scroll cuando la barra está abierta y lo restaura cuando se cierra
    useEffect(() => {
        if (open) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = ''
        }
        // Limpia el efecto cuando el componente se desmonta
        return () => { document.body.style.overflowY = '' }
    }, [open])

    // Filtra los productos según lo que escribió el usuario
    // Solo busca si hay más de 1 letra escrita y devuelve máximo 5 resultados
    const suggestions = query.length > 1
        ? products.filter(p =>
            p.player.toLowerCase().includes(query.toLowerCase()) ||
            p.team.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5)
        : []

    // Actualiza el query cada vez que el usuario escribe
    const handleChange = (e) => setQuery(e.target.value)

    // Cuando el usuario clickea una sugerencia, limpia el input, cierra la barra y navega al detalle
    const handleSelect = (product) => {
        setQuery('')
        setOpen(false)
        navigate(`/productos/${product.id}`)
    }

    // Cierra la barra y limpia el input
    const handleClose = () => {
        setOpen(false)
        setQuery('')
    }

    return { open, setOpen, query, suggestions, handleChange, handleSelect, handleClose }
}

export default useSearchBar;