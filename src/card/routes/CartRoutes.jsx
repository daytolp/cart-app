import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MENU } from '../../reducer/itemsActions'
import { Alert, Box } from '@mui/material'
import { CatalogView } from '../../card/components/CatalogView'
import { CartView } from '../../card/components/CartView'

export const CartRoutes = ({ cartItems, handlerAddProduct, handlerDeleteProductCart }) => {
    return (
        <>
            <Routes>
                <Route path={MENU[1].link} element={<CatalogView handler={handlerAddProduct} />} />
                <Route path={MENU[2].link} element={(
                    cartItems.length > 0 ?
                        <Box sx={{ mt: 3 }}>
                            <CartView items={cartItems} handlerDelete={handlerDeleteProductCart} />
                        </Box>
                        : <Alert sx={{ mt: 3 }} severity="info">No hay lementos en el carrito de compras.</Alert>
                )} />

                <Route path='/' element={<Navigate to={MENU[1].link} />} />
                <Route path='/*' element={<Navigate to={MENU[1].link} />} />
            </Routes>
        </>
  )
}
