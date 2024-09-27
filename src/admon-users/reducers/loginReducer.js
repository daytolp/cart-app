import { Constantes } from "../commons/Constants";

export const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case Constantes.login:
            return {
                isAuth: true,
                user: action.payload
            };

        case Constantes.logout:
            return {
                isAuth: false
            };
        default:
            return state;
    }
}