import { createSlice } from '@reduxjs/toolkit';
import { Constantes } from '../../../admon-users/commons/Constants';

export const initialForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
    admin:false
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

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        userSelected: initialForm,
        visibleForm: false,
        message: initialMessages,
        open: false,
        errors: initialErrors,
    },
    reducers: {
        addUser: (state, action) => {
            state.users =  [
                ...state.users,
                {
                    ...action.payload
                }
            ];
            state.userSelected = initialForm;
            state.visibleForm = false;
            state.open = true;
            state.message = { message: Constantes.message001, type: Constantes.messageSuccess };
        },
        onRemoveUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
            state.message = { message: Constantes.message003, type: Constantes.messageWarning };
            state.open = true;
        },
        onUpdateUser: (state, action) => {
            state.users = state.users.map(user => user.id !== action.payload.id ? user :  {...action.payload});
            state.userSelected = initialForm;
            state.visibleForm = false;
            state.open = true;
            state.message = { message: Constantes.message002, type: Constantes.messageSuccess }
        },
        loadingUsers:  (state, action) => {
            state.users = [...action.payload];
        },
        onSelected: (state, action) => {
            state.userSelected = action.payload;
            state.visibleForm = true;
            state.message = initialMessages;
            state.open = false;
        },
        onOpenForm: (state) => {
            state.visibleForm = true;
        },
        onClosesForm: (state) => {
            state.visibleForm = false;
            state.userSelected = initialForm;
            state.errors = {};
        },
        onError: (state, action) => {
            state.errors = action.payload;
        },
        onOpenAlert: (state) => {
            state.open = false;
        },
    }
});


// Action creators are generated for each case reducer function
export const { addUser, onRemoveUser, onUpdateUser, loadingUsers, onSelected, onOpenForm, onClosesForm, onError, onOpenAlert } = usersSlice.actions;