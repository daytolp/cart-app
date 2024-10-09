import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Password } from '@mui/icons-material';
import { Button, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Controller, useForm } from 'react-hook-form';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../context/AuthContext';

const initialForm = {
    username: '',
    password: ''
  } 
  
export const LoginPage = () => { 
    const { handlerLogin, handleErrorLogin } = useContext(AuthContext);
    const { control, watch, setValue, reset, register, handleSubmit, formState: { errors } } = useForm();

    // const onSubmit = handleSubmit(({username, password}) => {
    //     handlerLogin({username, password});            
    //     // setValue('username', '')
    //     // setValue('password', '')
    //     reset();
    // });
    const onSubmit = ({username, password}) => {
        handlerLogin({ username, password });
        // setValue('username', '')
        // setValue('password', '')
        reset();
    };

    const onError = (errors) => {
        handleErrorLogin(errors);
    };

  return (
    <>
          <Container maxWidth="lg" sx={{ marginTop: 5 }}>
          <Card variant="outlined">
            <Typography gutterBottom variant="h5" align='center' component="div" sx={{ marginTop: 5}}>
                Iniciar sesión
            </Typography>
              <Box sx={{ '& > :not(style)': { m: 3, width: '60ch' } }} align={'center'} component="form"
                  autoComplete="off" >
                    {/* <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        rules={{ 
                            required: 'Este campo es obligatorio',
                            minLength: { value: 4, message: 'El nombre de usuario debe tener al menos 4 caracteres' },
                            maxLength: { value: 10, message: 'El nombre de usuario no puede exceder los 10 caracteres' }
                         }}
                        render={({ field }) => (
                        <TextField
                            id="username"
                            {...field}
                            name='username'
                            label="Username"
                            slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle color={errors.username ? 'error' : ''} />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            variant="standard"
                            error={!!errors.username}
                            helperText={errors.username ? errors.username.message : ''}       
                        />                  
                      )}
                    />*/} 
                  <TextField
                      id="username"
                      label="Username"
                      error={!!errors.username}
                      name='username'
                      {...register('username', { 
                        required: 'Este campo es obligatorio', 
                        minLength: { value: 4, message: 'El nombre de usuario debe tener al menos 4 caracteres' },
                        maxLength: { value: 10, message: 'El nombre de usuario no puede exceder los 10 caracteres' }
                      })}
                      slotProps={{
                          input: {
                              startAdornment: (
                                  <InputAdornment position="start">
                                      <AccountCircle color={errors.username ? 'error' : ''} />
                                  </InputAdornment>
                              ),
                          },
                      }}
                      variant="standard"
                      helperText={errors.username ? errors.username.message : ''}
                  />
                  <TextField
                      id="password"
                      label="Password"
                      error={!!errors.password}
                      name='password'
                      type='password'
                      {...register('password',{
                        required: 'Este campo es obligatorio', 
                        minLength: { value: 4, message: 'El password debe tener al menos 4 caracteres' },
                      })}
                      slotProps={{
                          input: {
                              startAdornment: (
                                  <InputAdornment position="start">
                                      <Password color={errors.password ? 'error' : ''} />
                                  </InputAdornment>
                              ),
                          },
                      }}
                      variant="standard"
                      helperText={errors.password ? errors.password.message : ''}
                  />
              </Box>
              <Box sx={{ '& > :not(style)': { m: 3, width: '60ch' } }} align={'center'}>
                  <Box sx={{ flexGrow: 1, marginTop: 5 }} align={'left'}>
                      <Grid container >
                          <Grid size={12} direction='row'>
                              <Button type="submit" sx={{ marginRight: 1 }} onClick={handleSubmit(onSubmit, onError)} variant="contained">Login</Button>
                          </Grid>
                      </Grid>
                  </Box>
              </Box>
              </Card>
      </Container>
    </>
  )
}
