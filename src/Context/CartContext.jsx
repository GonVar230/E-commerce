import { createContext, useState } from 'react'

// Crea el contexto vacío que va a compartir los datos del carrito a toda la app
const CartContext = createContext()

export const CartProvider = ({ children }) => {
    // Lista de productos en el carrito
    const [cart, setCart] = useState([])

    // Agrega un producto al carrito
    const addToCart = (product) => {
        // Busca si ya existe ese producto con el mismo talle en el carrito
        const exists = cart.find(item => item.id === product.id && item.size === product.size)

        if (exists) {
            // Si ya existe y llegó al límite de stock no agrega más
            if (exists.quantity >= product.stock) return
            // Si ya existe pero tiene stock disponible suma 1 a la cantidad
            setCart(cart.map(item =>
                item.id === product.id && item.size === product.size
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ))
        } else {
            // Si no existe lo agrega al carrito con cantidad 1
            setCart([...cart, { ...product, quantity: 1 }])
        }
    }

    // Elimina un producto del carrito por id y talle
    // Necesita los dos porque puede haber el mismo producto en distintos talles
    const removeFromCart = (id, size) => {
        setCart(cart.filter(item => !(item.id === id && item.size === size)))
    }

    // Vacía el carrito completamente, se usa al confirmar el pedido
    const clearCart = () => setCart([])

    // Expone el carrito y todas las funciones para que cualquier componente pueda usarlos
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;