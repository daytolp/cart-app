import React from 'react'
import { AuthContext } from './AuthContext'
import { useAuth } from '../../../hooks/useAuth';

export const AuthProvider = ({children}) => {
  const { open, messages, login, handlerLogin, handlerLogout, handleClose, handleErrorLogin } = useAuth();

  return (
        <AuthContext.Provider value={
            {
               open, 
               messages, 
               login, 
               handlerLogin, 
               handlerLogout, 
               handleClose,
               handleErrorLogin       
            }
        }>
             {children}
        </AuthContext.Provider>
  )
}
