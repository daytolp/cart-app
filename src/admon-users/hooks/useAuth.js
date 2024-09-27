import { useReducer, useState } from "react";
import { loginReducer } from "../reducers/loginReducer";
import { loginUser } from "../services/authService";
import { Constantes } from "../commons/Constants";
import { useNavigate } from "react-router-dom";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
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
  
    const handlerLogin = ({ username, password }) => {   
      
      const isLogin = loginUser({username, password});

      if (isLogin) {
        const user = { username: 'admin'};
        dispatch({
          type: Constantes.login,
          payload: user
        });
        sessionStorage.setItem('login', JSON.stringify({
          isAuth: true,
          user
        }));
        navigate('/users');
      } else {
        setOpen(true);
        setMessages({ message: Constantes.message005, type: Constantes.messageError });
      }
    }
  
    const handlerLogout = () => {
      dispatch({
        type: '[logout]'
      });
      sessionStorage.removeItem('login');
    }
    
    const handleClose = (_, reason) => {
      if (reason === 'clickaway') return;    
      setOpen(false);
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