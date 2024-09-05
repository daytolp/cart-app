import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'

  
const form = {
    product: '',
    price: '',
    quantity: '',
} 
export const FormItemsView = ({ handler }) => {
    const [invoiceForm, setInvoiceForm] = useState(form);
    const { product, price, quantity } = invoiceForm;

    //Al final van los metodos
    const onInputChange = ({ target: {name, value}}) => {
        setInvoiceForm({
            ...invoiceForm,
            [name]: value
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (product.trim().length <= 1 || price.trim().length <= 1 || quantity.trim().length < 1 || isNaN(price.trim()) || isNaN(quantity.trim())) return;

        handler(invoiceForm);
        setInvoiceForm(form);
    }
    return (
        <>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { mr: 1, mb: 1, mt: 1, width: '41ch' } }}
                noValidate
                autoComplete="off"
                onSubmit={onSubmit}
            >
                <div>
                    <TextField
                        required
                        id="product"
                        label="Producto"
                        type="text"
                        name="product"
                        value={product}
                        onChange={onInputChange}
                    />
                    <TextField
                        id="price"
                        label="Precio"
                        type="text"
                        name="price"
                        value={price}
                        onChange={onInputChange}
                    />
                    <TextField
                        id="quantity"
                        label="Cantidad"
                        type="text"
                        name="quantity"
                        value={quantity}
                        onChange={onInputChange}
                    />
                </div>
                <Button type="submit" variant="contained">Crear item</Button>
            </Box>
        </>
    )
}
