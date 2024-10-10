import React, { useEffect, useState, useContext } from 'react'
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Email, Password } from '@mui/icons-material';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { useUsers } from '../hooks/useUsers';

export const UserForm = ({ userSelected, handleClosesForm }) => {
  const { handlerAddUser, initialForm, errors } = useUsers();
  const navigate = useNavigate();
  const [userForm, setUserform] = useState(initialForm);
  const { id, username, password, email, admin } = userForm;  
  const [checked, setChecked] = useState(admin);

  useEffect(() => {
    setUserform({ ...userSelected })
  }, [userSelected]);

  const onInputChange = ({ target: { name, value } }) => {
    setUserform({ ...userForm, [name]: value });
  }

  const onSubmit = async(event) => {
    event.preventDefault();
    // if (!username || (!password && id === 0) || !email) return;
    
    await handlerAddUser(userForm);
    if (!handleClosesForm) navigate('/users');
  }

  const onCloseForm = () => {
    handleClosesForm();
    setUserform(initialForm);
  }

  const onCheckChange = () => {
    setChecked(!checked);
    setUserform({ ...userForm, admin: checked });
  }
  return (
    <>
      <Box sx={{ '& > :not(style)': { m: 3, width: '60ch' } }} align={'center'} component="form"
        autoComplete="off" >
        <input type="hidden" id='id' value={id}/>
        <TextField
          id="username"
          label="Username"
          error={errors?.username ? true : false}
          name='username'
          value={username}
          onChange={onInputChange}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle color={errors?.username ? 'error' : ''} />
                </InputAdornment>
              ),
            },
          }}
          variant="standard"
          helperText={errors?.username ? errors?.username : ''}
        />
        {id === 0 && (<TextField
          id="password"
          label="Password"
          error={errors?.password ? true : false}
          name='password'
          type='password'
          value={password}
          onChange={onInputChange}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Password color={errors?.password ? 'error' : ''} />
                </InputAdornment>
              ),
            },
          }}
          variant="standard"
          helperText={errors?.password ? errors?.password : ''}
        />)}

        <TextField
          id="email"
          label="Email"
          error={errors?.email ? true : false}
          name='email'
          value={email}
          onChange={onInputChange}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Email color={errors?.email ? 'error' : ''} />
                </InputAdornment>
              ),
            },
          }}
          variant="standard"
          helperText={errors?.email ? errors?.email : ''}
        />
        <FormControlLabel control={<Checkbox checked={admin}  onChange={onCheckChange} />} label="Admin" />
      </Box>
      <Box sx={{ '& > :not(style)': { m: 3, width: '60ch' } }} align={'center'}>
        <Box sx={{ flexGrow: 1, marginTop: 5 }} align={'left'}>
          <Grid container >
            <Grid size={12} direction='row'>
              <Button type="submit" sx={{marginRight: 1}} onClick={onSubmit} variant="contained">{id > 0 ? 'Actualizar' : 'Crear usuario'}</Button>   
              {handleClosesForm && <Button color='warning' onClick={() => onCloseForm()} variant="contained">Cerrar</Button>}           
              
            </Grid>
          </Grid>
        </Box>
      </Box>

    </>
  )
}
