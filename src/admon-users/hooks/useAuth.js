import { useState } from "react";
import { loginUser } from "../services/authService";
import { Constantes } from "../commons/Constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onCloseAlertLogin, onLogin, onLogout, onMessageLogin } from "../../store/slices/auth/AuthSlice";

  
// const initialMessages = {
//   message: '',
//   type: ''
// }
export const useAuth = () => {
    // const [open, setOpen] = useState(false);
    // const [messages, setMessages] = useState(initialMessages);
    const dispatch = useDispatch();
    const { user, isAdmin, isAuth, messages, open } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handleErrorLogin = (errors) => {
      if (errors.username?.type == 'required' || errors.password?.type == 'required') {
        dispatch(onMessageLogin({ message: Constantes.message004, type: Constantes.messageError }));
        return;
      }
    }
  
    const handlerLogin = async({ username, password }) => {        
      try {
        const response = await loginUser({username, password});
        const token = response.data.token;
        const claims = decodeToken(token);
        const user = { username: response.data.username};

        dispatch(onLogin({user, isAdmin: claims.isAdmin}));

        sessionStorage.setItem('login', JSON.stringify({
          isAuth: true,
          isAdmin: claims.isAdmin,
          user
        }));

        sessionStorage.setItem('token', `Bearer ${token}`);
        navigate('/users');
      } catch (error) {
        if (error.response?.status == 401)
          dispatch(onMessageLogin({ message: Constantes.message005, type: Constantes.messageError }));
        else if (error.response?.status == 403)
          dispatch(onMessageLogin({ message: Constantes.message006, type: Constantes.messageError }));
        else throw error;       
      }
    }
  
    const handlerLogout = () => {
      dispatch(onLogout());
      sessionStorage.clear();
    }
    
    const handleClose = (_, reason) => {
      if (reason === 'clickaway') return;    
      dispatch(onCloseAlertLogin())
    }

    const decodeToken = (token) => {
      return JSON.parse(window.atob(token.split(".")[1]));
    }

    return {
        open,
        messages,
        login: { user, isAdmin, isAuth },
        handlerLogin,
        handlerLogout,
        handleClose,
        handleErrorLogin
    }
}