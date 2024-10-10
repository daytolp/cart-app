import React, { useContext, useEffect } from 'react'
import { LoginPage } from './admon-users/components/auth/pages/LoginPage'
import { Alert, Box, Container, Snackbar, Typography } from '@mui/material'
import { useAuth } from './admon-users/hooks/useAuth'
import { Navigate, Route, Routes } from 'react-router-dom'
import { UserRoutes } from './admon-users/UserRoutes'
import { useItemsCart } from './hooks/useItemsCart'
import { MENU } from './reducer/itemsActions'
import { CartView } from './card/components/CartView'
import { CatalogView } from './card/components/CatalogView'
import { Navbar } from './admon-users/components/layout/Navbar'
import { AuthContext } from './admon-users/components/auth/context/AuthContext'

export const AppRoutes = () => {
    const { open, messages, login, handleClose } = useAuth();
    const { cartItems, handlerAddProduct, handlerDeleteProductCart } = useItemsCart();

    return (
      <>
      <Navbar />
      <Container maxWidth="lg" sx={{ marginTop: 5 }}>
      <Routes>
        { login.isAuth ? 
          ( <>
              
              <Route path='/*' element={ <UserRoutes />} />
              <Route path={MENU[1].link} element={<CatalogView handler={handlerAddProduct} />} />
                  <Route path={MENU[2].link} element={(
                      cartItems.length > 0 ?
                          <Box sx={{ mt: 3 }}>
                              <CartView items={cartItems} handlerDelete={handlerDeleteProductCart} />
                          </Box>
                          : <Alert sx={{ mt: 3 }} severity="info">No hay lementos en el carrito de compras.</Alert>
                  )} />
            </>    
          ) : 
          <>
              <Route path='/login' element={ <LoginPage/> } />
              <Route path='/*' element={ <Navigate to="/login"/> } />
          </>
          
        }
      </Routes>
      </Container>
  
   
      <Box
        component="footer" 
        sx={{
          position: 'fixed', 
          bottom: '0px', 
          left: 0,
          right: 0,
          py: 8,
          px: 2,
          // mt: 'auto',
          // backgroundColor:"#4e4b6b",
          // color:'white'
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[300]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            © 2024 CartApp. Todos los derechos reservados.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Desarrollado por Dayto
          </Typography>
        </Container>
      </Box>
    
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
            anchorOrigin={{  vertical: 'top',   horizontal: 'right' }}>
          <Alert
            onClose={handleClose}
            severity={messages?.type}
            variant="filled"
            sx={{ width: '100%' }}
          >
            { messages?.message }
          </Alert>
        </Snackbar>
      </>
    )
}
  