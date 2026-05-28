import { useState } from 'react'
import { useCart } from '../Context/useCart'

const useItemDetail = (product) => {
    const [selectedImg, setSelectedImg] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [selectedSize, setSelectedSize] = useState(null)
    const [sizeError, setSizeError] = useState(false)
    const { addToCart, cart } = useCart()

    const isSizeDisabled = (size, stock) => {
        const found = cart.find(item => item.id === product.id && item.size === size)
        return stock === 0 || (found ? found.quantity >= stock : false)
    }

    const isCartDisabled = !selectedSize || (() => {
        const sizeData = product.sizes.find(s => s.size === selectedSize)
        return sizeData ? isSizeDisabled(selectedSize, sizeData.stock) : true
    })()

    const handleAddToCart = () => {
        if (!selectedSize) {
            setSizeError(true)
            return
        }
        const sizeData = product.sizes.find(s => s.size === selectedSize)
        if (isSizeDisabled(selectedSize, sizeData.stock)) return
        addToCart({ ...product, size: selectedSize })
        setShowModal(true)
        setSizeError(false)
    }

    const handleSizeSelect = (size, stock) => {
        if (!isSizeDisabled(size, stock)) {
            setSelectedSize(size)
            setSizeError(false)
        }
    }

    return {
        selectedImg, setSelectedImg,
        showModal, setShowModal,
        selectedSize,
        sizeError,
        isSizeDisabled,
        isCartDisabled,
        handleAddToCart,
        handleSizeSelect
    }
}

export default useItemDetail;