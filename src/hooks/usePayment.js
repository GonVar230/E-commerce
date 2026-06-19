import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useCart } from '../Context/useCart'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../service/firebase'

const usePayment = (form, total) => {
    const { cart, clearCart } = useCart()
    const [submitted, setSubmitted] = useState(false)
    const [orderId, setOrderId] = useState(null)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: { numero: '', vencimiento: '', cvv: '', titular: '' }
    })

    const generateOrderId = useCallback(() => {
        const timestamp = Date.now().toString(36).toUpperCase()
        const random = Math.random().toString(36).substring(2, 6).toUpperCase()
        return `ORD-${timestamp}-${random}`
    }, [])

    // Arma los datos del comprador con la fecha del servidor
    const buyerData = () => ({
        ...form,
        fecha: serverTimestamp()
    })

    // Sube la orden a Firebase cuando el usuario confirma el pago
    const confirmarPedido = useCallback(() => {
        const orderData = {
            buyer: buyerData(),
            items: cart,
            total,
        }

        const ordersRef = collection(db, 'orders')

        addDoc(ordersRef, orderData)
            .then(() => {
                clearCart()
                setOrderId(generateOrderId())
                setSubmitted(true)
            })
            .catch((error) => {
                console.log(error)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart, total, form, clearCart, generateOrderId])

    const handleSubmit2 = form.pago === 'visa'
        ? handleSubmit(confirmarPedido)
        : confirmarPedido

    return {
        submitted,
        orderId,
        register,
        errors,
        setValue,
        onSubmit: handleSubmit2
    }
}

export default usePayment;