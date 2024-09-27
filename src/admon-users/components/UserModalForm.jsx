import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React, { useContext } from 'react'
import { UserForm } from './UserForm'
import Slide from '@mui/material/Slide';
import { UserContext } from '../context/userContext';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
  
export const UserModalForm = () => {
  const { userSelected, handleClosesForm, visibleForm} = useContext(UserContext);
  return (
    <>
        <Dialog
            maxWidth='md'
            TransitionComponent={Transition}
            open={visibleForm}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              { userSelected.id > 0 ? 'Editar' : 'Crear'}
            </DialogTitle>
            <DialogContent>
               <UserForm userSelected={ userSelected } handleClosesForm={ handleClosesForm }/>
            </DialogContent>
          </Dialog>
    
    </>
  )
}
