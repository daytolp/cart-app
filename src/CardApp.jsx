import { Container, Typography } from '@mui/material';
import React from 'react'
import { useItemsCart } from './hooks/useItemsCart';
import { Navbar } from './card/components/Navbar';
import { CartRoutes } from './card/routes/CartRoutes';

const CardApp = () => {
   const { cartItems, handlerAddProduct, handlerDeleteProductCart } = useItemsCart();
    return (
        <>
            <Navbar/>
            <Container maxWidth="lg" sx={{ marginTop: 5 }}>                
                <Typography variant='h4'>CardApp</Typography>
                <CartRoutes 
                    cartItems={ cartItems }  
                    handlerAddProduct= { handlerAddProduct }
                    handlerDeleteProductCart={ handlerDeleteProductCart }
                />              
            </Container>
        </>
    )
}

export default CardApp;