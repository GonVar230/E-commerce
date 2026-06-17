import { useState } from 'react'
import { useCart } from '../Context/useCart'

const usePayment = (form) => {
    const { clearCart } = useCart()
    const [submitted, setSubmitted] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const [card, setCard] = useState({ numero: '', vencimiento: '', cvv: '', titular: '' })
    const [errors, setErrors] = useState({})

    const handleCardChange = (e) => {
        const { name, value } = e.target

        if (name === 'cvv') {
            if (!/^\d*$/.test(value)) return
        }

        setCard({ ...card, [name]: value })
        setErrors({ ...errors, [name]: '' })
    }

    const validateCard = () => {
        const newErrors = {}
        if (!card.numero || card.numero.length < 16)
            newErrors.numero = 'Ingresá un número de tarjeta válido'
        if (!card.vencimiento || !/^\d{2}\/\d{2}$/.test(card.vencimiento))
            newErrors.vencimiento = 'Formato MM/AA'
        if (!card.cvv || card.cvv.length < 3)
            newErrors.cvv = 'CVV inválido'
        if (!card.titular)
            newErrors.titular = 'Campo requerido'
        return newErrors
    }

    const generateOrderId = () => {
        // Genera un ID único combinando la fecha y un número aleatorio
        const timestamp = Date.now().toString(36).toUpperCase()
        const random = Math.random().toString(36).substring(2, 6).toUpperCase()
        return `ORD-${timestamp}-${random}`
    }

    const handleSubmit = () => {
        if (form.pago === 'visa') {
            const newErrors = validateCard()
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors)
                return
            }
        }
        clearCart()
        setOrderId(generateOrderId())
        setSubmitted(true)
    }

    return { submitted, orderId, card, errors, handleCardChange, handleSubmit }
}

export default usePayment;