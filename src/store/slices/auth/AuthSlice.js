import { createSlice } from '@reduxjs/toolkit';

const initialMessages = {
    message: '',
    type: ''
}

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    isAdmin: false,
    user: undefined,
    messages: initialMessages,
    open: false,
  }

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialLogin,
    reducers: {
        onLogin: (state, action) => {
            state.isAuth = true;
            state.isAdmin = action.payload.isAdmin;
            state.user = action.payload.user;
        },
        onLogout: (state) => {
            state.isAuth = false;
            state.isAdmin = false;
            state.user = undefined;
        }, 
        onMessageLogin: (state, action) => {
            state.open = true;
            state.messages = action.payload;
        },
        onCloseAlertLogin: (state) => {
            state.open = false;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onLogin, onLogout, onMessageLogin, onCloseAlertLogin } = authSlice.actions;