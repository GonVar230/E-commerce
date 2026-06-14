import { useContext } from 'react'
import CartContext from './CartContext'

// Hook personalizado para consumir el CartContext de forma más simple
// En vez de escribir useContext(CartContext) en cada componente, alcanza con useCart()
export const useCart = () => useContext(CartContext)