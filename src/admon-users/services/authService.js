import apiUrl from "../../api/api";


export const loginUser = async({username, password}) => {
    try {
        return await apiUrl.post('login', {username, password});
    } catch (error) {
        throw error;
    }
}