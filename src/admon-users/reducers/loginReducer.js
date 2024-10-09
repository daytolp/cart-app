import { Constantes } from "../commons/Constants";

export const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case Constantes.login:
            return {
                isAuth: true,
                isAdmin: action.payload.isAdmin,
                user: action.payload.user
            };

        case Constantes.logout:
            return {
                isAuth: false,
                isAdmin: false,
                user: undefined
            };
        default:
            return state;
    }
}