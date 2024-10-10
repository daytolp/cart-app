import { Alert, Box, Button, Container, Snackbar, Typography } from '@mui/material';
import { UserList } from '../components/UserList';
import { UserModalForm } from '../components/UserModalForm';
import Grid from '@mui/material/Grid2';
import * as React from 'react';
import { useUsers } from '../hooks/useUsers';
import { useAuth } from '../hooks/useAuth';



export const UserPage = () => {
  const { users, open, message, visibleForm, 
          getUsers, handleClose, handlerOpenForm } = useUsers();
  
  React.useEffect(() => {
    getUsers();
  }, []);
  
  const { login } = useAuth();

  return (
    <>
        {/* Modal user */}
      {visibleForm && 
        <>
          <UserModalForm />
        </>
      }
        <Container maxWidth="lg" sx={{ marginTop: 5 }}> 
        <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: 'repeat(1, 1fr)' }}>
           <Typography variant='h5'>Administración de usuarios</Typography>         
        </Box>  
        <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: 'repeat(1, 1fr)' }}> 
          { (!visibleForm && login.isAdmin) && 
            <Box sx={{ flexGrow: 1, marginTop: 5 }}>
              <Grid container >
                <Grid size={4}>
                  <Button variant="contained" onClick={handlerOpenForm}>Nuevo usuario</Button>
                </Grid>
                <Grid size={8}>
                </Grid>
              </Grid>
            </Box> 
          }             

          {
            users.length === 0 ? <Alert severity="warning">No hay usuarios en el sistema</Alert>
              : <UserList />
          }
           
        </Box>          
        </Container>
       
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
          anchorOrigin={{  vertical: 'top',   horizontal: 'right' }}
        >
        <Alert
          onClose={handleClose}
          severity={message.type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          { message.message }
        </Alert>
      </Snackbar>
    </>
  )
}
