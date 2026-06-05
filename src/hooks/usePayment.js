import { useState } from 'react'
import { useCart } from '../Context/useCart'

const usePayment = (form) => {
    const { clearCart } = useCart()
    const [submitted, setSubmitted] = useState(false)
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

    const handleSubmit = () => {
        if (form.pago === 'visa') {
            const newErrors = validateCard()
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors)
                return
            }
        }
        clearCart()
        setSubmitted(true)
    }

    return { submitted, card, errors, handleCardChange, handleSubmit }
}

export default usePayment;