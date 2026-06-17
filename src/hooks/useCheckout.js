import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../Context/useCart'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../service/firebase'

const useCheckout = () => {
    const { cart } = useCart()
    const navigate = useNavigate()
    const total = cart.reduce((acc, item) => acc + item.price, 0)

    const [form, setForm] = useState({
        nombre: '', apellido: '', email: '',
        telefono: '', direccion: '', ciudad: '', pago: ''
    })

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === 'nombre' || name === 'apellido' || name === 'ciudad') {
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) return
        }

        if (name === 'telefono') {
            if (!/^\d*$/.test(value)) return
        }

        if (name === 'direccion') {
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]*$/.test(value)) return
        }

        setForm({ ...form, [name]: value })
        setErrors({ ...errors, [name]: '' })
    }

    const validate = () => {
        const newErrors = {}
        if (!form.nombre)
            newErrors.nombre    = 'Campo requerido'
        if (!form.apellido)
            newErrors.apellido  = 'Campo requerido'
        if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            newErrors.email     = 'Email inválido'
        if (!form.telefono || form.telefono.length < 8)
            newErrors.telefono  = 'Teléfono inválido'
        if (!form.direccion)
            newErrors.direccion = 'Campo requerido'
        if (!form.ciudad)
            newErrors.ciudad    = 'Campo requerido'
        if (!form.pago)
            newErrors.pago      = 'Seleccioná un método de pago'
        return newErrors
    }

    const buyerData = () => ({
        ...form,
        fecha: serverTimestamp()
    })

    const terminarCompra = (e) => {
        e.preventDefault()

        const newErrors = validate()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setLoading(true)

        const orderData = {
            buyer: buyerData(),
            items: cart,
            total,
        }

        const ordersRef = collection(db, 'orders')

        addDoc(ordersRef, orderData)
            .then(() => {
                navigate('/pago', { state: { form, total } })
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }

    return { cart, total, form, errors, loading, handleChange, terminarCompra }
}

export default useCheckout;