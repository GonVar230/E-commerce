import { createContext, useState } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const addToCart = (product) => {
        const exists = cart.find(item => item.id === product.id && item.size === product.size)
        if (exists) {
            if (exists.quantity >= product.stock) return
            setCart(cart.map(item =>
                item.id === product.id && item.size === product.size
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ))
        } else {
            setCart([...cart, { ...product, quantity: 1 }])
        }
    }

    const removeFromCart = (id, size) => {
        setCart(cart.filter(item => !(item.id === id && item.size === size)))
    }

    const clearCart = () => setCart([])

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;