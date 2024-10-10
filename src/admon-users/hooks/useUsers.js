
import { getAll, removeUser, saveUser, updateUser } from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { initialForm, addUser, onRemoveUser, onUpdateUser, loadingUsers, onSelected, onOpenForm, onClosesForm, onError, onOpenAlert } from "../../store/slices/users/UserSlice";
import { useAuth } from "./useAuth";

export const useUsers = () => {
    const { login, handlerLogout } = useAuth();
    // const [users, dispatch] = useReducer(usersReducer, initialUsers);
    // const [userSelected, setUserSelected] = useState(initialForm);
    // const [visibleForm, setVisibleForm] = useState(false);
    const {users, userSelected, visibleForm, message, errors, open} = useSelector(state => state.users);
    const dispatch = useDispatch();
    // const [open, setOpen] = useState(false);
    // const [message, setMessage] = useState(initialMessages);
    // const [errors, setErrors] = useState(initialErrors);

    const getUsers = async() => {
      try {
        const result = await getAll();
        dispatch(loadingUsers(result.data));
      } catch (error) {
        if (error.response?.status === 401)
          handlerLogout();
      }
    }

    const handlerAddUser = async(user) => {
        if (!login.isAdmin) return;
        let response = null;
        // let type = Constantes.addUser;
        try {
          // setMessage({ message: Constantes.message001, type: Constantes.messageSuccess });
          if (user.id !== 0) {
              response = await updateUser(user);
              // type = Constantes.updateUser;
              // setMessage({ message: Constantes.message002, type: Constantes.messageSuccess });
              dispatch(onUpdateUser(response.data));
          } else {
              response = await saveUser(user);
              dispatch(addUser(response.data));
          }

          // setOpen(true);
          handleClosesForm(); 
        } catch (error) {
          if (error.response?.status === 400)
            dispatch(onError(error.response.data));
          else if (error.response?.status === 500 && error.response.data.includes('UK_email')) {
            dispatch(onError({email: 'El email ya existe'}));
          } else if (error.response?.status === 500 && error.response.data.includes('UK_username'))
            dispatch(onError({username: 'El username ya existe'}));
          else if (error.response?.status == 401)
            handlerLogout();
          else throw error;
        }   
        
      }
    
      const handlerRemoveUser = async(id) => {
        if (!login.isAdmin) return;
        try {
          await removeUser(id);
          dispatch(onRemoveUser(id));
          // setMessage({ message: Constantes.message003, type: Constantes.messageWarning });
          // setOpen(true);
        } catch (error) {
          if (error.response?.status == 401)
            handlerLogout();
        }     
      }
    
      const handlerSelected = (user) => {
        // setVisibleForm(true);
        // setUserSelected({...user});
        // setMessage(initialMessages);
        // setOpen(false);
        dispatch(onSelected({...user}))
      }

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;    
        // setOpen(false);
        dispatch(onOpenAlert());
      };

      const handlerOpenForm = () => {
        dispatch(onOpenForm());
      }

      const handleClosesForm = () => {
        // setVisibleForm(false);
        // setUserSelected(initialForm);
        // setErrors({});
        dispatch(onClosesForm());
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