import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import products from '../data/products.json'

const useSearchBar = () => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const suggestions = query.length > 1
        ? products.filter(p =>
            p.player.toLowerCase().includes(query.toLowerCase()) ||
            p.team.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5)
        : []

    const handleChange = (e) => setQuery(e.target.value)

    const handleSelect = (product) => {
        setQuery('')
        setOpen(false)
        navigate(`/productos/${product.id}`)
    }

    const handleClose = () => {
        setOpen(false)
        setQuery('')
    }

    return { open, setOpen, query, suggestions, handleChange, handleSelect, handleClose }
}

export default useSearchBar