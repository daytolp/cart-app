import { Constantes } from "../commons/Constants";

export const usersReducer = (state = [], action) => {
    switch (action.type) {

        case Constantes.addUser:        
            return [
                ...state,
                {
                    ...action.payload
                }
            ];
        case Constantes.removeUser:            
            return state.filter(user => user.id !== action.payload);
        case Constantes.updateUser:            
            return state.map(user => user.id !== action.payload.id ? user :  {...action.payload, password: user.password});
        case Constantes.loadingUsers:
            return [...action.payload];
    }
}
