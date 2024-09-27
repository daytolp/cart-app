import { UserContext } from "./userContext"
import { useUsers } from '../hooks/useUsers'

export const UserProvider = ({children}) => {
    const { users, userSelected, initialForm, open, message, visibleForm, errors,
        handlerAddUser, handlerRemoveUser, handlerSelected, handleClose, handlerOpenForm, handleClosesForm, getUsers } = useUsers();

    return (
        <UserContext.Provider value={
            {
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
        }>
             {children}
             {/* son los hijos que envuelve donde se instancia el UserProvider */}
        </UserContext.Provider>

    )
}