import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../Context/useCart'

const useCheckout = () => {
    const { cart } = useCart()
    const navigate = useNavigate()
    const total = cart.reduce((acc, item) => acc + item.price, 0)
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        defaultValues: {
            nombre: '', apellido: '', email: '',
            telefono: '', direccion: '', ciudad: '', pago: ''
        }
    })

    const pagoSeleccionado = useWatch({ control, name: 'pago' })

    // Solo valida el formulario y navega a /pago, no toca Firebase todavía
    const continuarAlPago = (formValues) => {
        setLoading(true)
        navigate('/pago', { state: { form: formValues, total } })
    }

    return {
        cart,
        total,
        loading,
        register,
        errors,
        pagoSeleccionado,
        onSubmit: handleSubmit(continuarAlPago)
    }
}

export default useCheckout;