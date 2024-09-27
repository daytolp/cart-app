import { useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import { Constantes } from "../commons/Constants";
import { getAll, removeUser, saveUser, updateUser } from "../services/userService";
import { set } from "react-hook-form";

const initialUsers = [
];

const initialForm = {
  id: 0,
  username: '',
  password: '',
  email: ''
} 

const initialMessages = {
    message: '',
    type: ''
}

const initialErrors = {
  username: '',
  password: '',
  email: ''
}

export const useUsers = () => {
    const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const [userSelected, setUserSelected] = useState(initialForm);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(initialMessages);
    const [visibleForm, setVisibleForm] = useState(false);
    const [errors, setErrors] = useState(initialErrors);

    const getUsers = async() => {
      const result = await getAll();
      dispatch({type: Constantes.loadingUsers, payload: result.data})
    }

    const handlerAddUser = async(user) => {
        let response = null;
        let type = Constantes.addUser;
        try {
          setMessage({ message: Constantes.message001, type: Constantes.messageSuccess });
          if (user.id !== 0) {
              response = await updateUser(user);
              type = Constantes.updateUser;
              setMessage({ message: Constantes.message002, type: Constantes.messageSuccess });
          } else {
              response = await saveUser(user);
          }
          dispatch({ type, payload: response.data });
          setOpen(true);
          handleClosesForm(); 
        } catch (error) {
          if (error.response && error.response.status === 400)
            setErrors(error.response.data)
          else throw error;
        }        
      }
    
      const handlerRemoveUser = (id) => {
        removeUser(id);
        dispatch({ type: Constantes.removeUser, payload: id });
        setMessage({ message: Constantes.message003, type: Constantes.messageWarning });
        setOpen(true);
      }
    
      const handlerSelected = (user) => {
        setVisibleForm(true);
        setUserSelected({...user});
        setMessage(initialMessages);
        setOpen(false);
      }

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;    
        setOpen(false);
      };

      const handlerOpenForm = () => {
        setVisibleForm(true);
      }

      const handleClosesForm = () => {
        setVisibleForm(false);
        setUserSelected(initialForm);
        setErrors({});
      }

    return  {
        users,
        userSelected,
        initialForm,
        open,
        message,
        visibleForm,
        errors,
        handlerAddUser,
        handlerRemoveUser,
        handlerSelected,
        handleClose,
        handlerOpenForm,
        handleClosesForm,
        getUsers
    }
}