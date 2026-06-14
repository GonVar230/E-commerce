import { useState } from 'react'
import { useCart } from '../Context/useCart'

const useItemDetail = (product) => {
    // Índice de la imagen seleccionada en la galería
    const [selectedImg, setSelectedImg] = useState(0)
    // Controla si se muestra el modal de confirmación al agregar al carrito
    const [showModal, setShowModal] = useState(false)
    // Guarda el talle que eligió el usuario
    const [selectedSize, setSelectedSize] = useState(null)
    // Muestra el error cuando el usuario intenta agregar sin elegir talle
    const [sizeError, setSizeError] = useState(false)

    const { addToCart, cart } = useCart()

    // Lista de talles del producto, si no tiene devuelve array vacío
    const productSizes = product.sizes || []

    // Devuelve true si un talle no se puede seleccionar
    // Pasa cuando el stock es 0 o cuando ya se agregó la cantidad máxima al carrito
    const isSizeDisabled = (size, stock) => {
        const productInCart = cart.find((item) => {
            return item.id === product.id && item.size === size
        })

        return (
            stock === 0 ||
            productInCart?.quantity >= stock
        )
    }

    // El botón de agregar al carrito está deshabilitado si no hay talle seleccionado
    const isCartDisabled = !selectedSize

    // Selecciona un talle solo si no está deshabilitado
    const handleSizeSelect = (size, stock) => {
        if (isSizeDisabled(size, stock)) {
            return
        }

        setSelectedSize(size)
        setSizeError(false)
    }

    // Agrega el producto al carrito con el talle elegido
    const handleAddToCart = () => {

        // Si no hay talle seleccionado muestra el error y corta
        if (!selectedSize) {
            setSizeError(true)
            return
        }

        // Busca los datos del talle seleccionado para verificar el stock
        const selectedSizeData = productSizes.find((sizeInfo) => {
            return sizeInfo.size === selectedSize
        })

        // Si no encuentra el talle corta
        if (!selectedSizeData) {
            return
        }

        // Si el talle está deshabilitado corta
        if (isSizeDisabled(selectedSize, selectedSizeData.stock)) {
            return
        }

        // Agrega el producto al carrito con el talle elegido
        addToCart({
            ...product,
            size: selectedSize
        })

        // Muestra el modal de confirmación y limpia el error
        setShowModal(true)
        setSizeError(false)
    }

    return {
        selectedImg,
        setSelectedImg,
        showModal,
        setShowModal,
        selectedSize,
        sizeError,
        isSizeDisabled,
        isCartDisabled,
        handleAddToCart,
        handleSizeSelect
    }
}

export default useItemDetail;