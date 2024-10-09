import { useReducer, useState } from "react";
import { loginReducer } from "../reducers/loginReducer";
import { loginUser } from "../services/authService";
import { Constantes } from "../commons/Constants";
import { useNavigate } from "react-router-dom";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    isAdmin: false,
    user: undefined
  }
  
  const initialMessages = {
    message: '',
    type: ''
  }

export const useAuth = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState(initialMessages);
    const [login, dispatch] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();

    const handleErrorLogin = (errors) => {
      if (errors.username?.type == 'required' || errors.password?.type == 'required') {
        setMessages({ message: Constantes.message004, type: Constantes.messageError });
        setOpen(true);
        return;
      }
    }
  
    const handlerLogin = async({ username, password }) => {        
      try {
        const response = await loginUser({username, password});
        const token = response.data.token;
        const claims = decodeToken(token);
        const user = { username: response.data.username};

        dispatch({
          type: Constantes.login,
          payload: {user, isAdmin: claims.isAdmin}
        });
        sessionStorage.setItem('login', JSON.stringify({
          isAuth: true,
          isAdmin: claims.isAdmin,
          user
        }));

        sessionStorage.setItem('token', `Bearer ${token}`);
        navigate('/users');
      } catch (error) {
        if (error.response?.status == 401)
          setMessages({ message: Constantes.message005, type: Constantes.messageError });
        else if (error.response?.status == 403)
          setMessages({ message: Constantes.message006, type: Constantes.messageError });
        else throw error;
        setOpen(true);        
      }
    }
  
    const handlerLogout = () => {
      dispatch({
        type: '[logout]'
      });
      sessionStorage.clear();
    }
    
    const handleClose = (_, reason) => {
      if (reason === 'clickaway') return;    
      setOpen(false);
    }

    const decodeToken = (token) => {
      return JSON.parse(window.atob(token.split(".")[1]));

    }

    return {
        open,
        messages,
        login,
        handlerLogin,
        handlerLogout,
        handleClose,
        handleErrorLogin
    }
}