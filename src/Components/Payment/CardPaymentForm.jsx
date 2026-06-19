const CardPaymentForm = ({ register, errors, onSubmit, handleVencimientoChange }) => {
    return (
        <form onSubmit={onSubmit}>
            <h2 className="payment-title">Datos de tu tarjeta</h2>
            <div className="payment-form">
                <div className="form-group">
                    <label>Número de tarjeta</label>
                    <input
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        {...register('numero', {
                            required: 'Campo requerido',
                            minLength: { value: 16, message: 'Ingresá un número de tarjeta válido' }
                        })}
                    />
                    {errors.numero && <span className="form-error">{errors.numero.message}</span>}
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Vencimiento</label>
                        <input
                            placeholder="MM/AA"
                            maxLength={5}
                            {...register('vencimiento', {
                                required: 'Campo requerido',
                                pattern: { value: /^\d{2}\/\d{2}$/, message: 'Formato MM/AA' }
                            })}
                            onChange={handleVencimientoChange}
                        />
                        {errors.vencimiento && <span className="form-error">{errors.vencimiento.message}</span>}
                    </div>
                    <div className="form-group">
                        <label>CVV</label>
                        <input
                            placeholder="123"
                            maxLength={3}
                            {...register('cvv', {
                                required: 'Campo requerido',
                                minLength: { value: 3, message: 'CVV inválido' },
                                pattern: { value: /^\d*$/, message: 'Solo números' }
                            })}
                        />
                        {errors.cvv && <span className="form-error">{errors.cvv.message}</span>}
                    </div>
                </div>
                <div className="form-group">
                    <label>Nombre en la tarjeta</label>
                    <input
                        placeholder="JUAN GARCIA"
                        {...register('titular', { required: 'Campo requerido' })}
                    />
                    {errors.titular && <span className="form-error">{errors.titular.message}</span>}
                </div>
            </div>

            <button className="payment-btn" type="submit">
                <i className="bi bi-lock"></i> Confirmar pedido
            </button>
        </form>
    )
}

export default CardPaymentForm;