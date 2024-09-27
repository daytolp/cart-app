import axios from "axios"
import apiUrl from "../../api/api";

export const getAll = async() => {
   try {
    return await apiUrl.get('users');
   } catch(error) {
    console.log(error); 
   }    
}

export const saveUser = async({username, email, password}) => {
   try {
    return await apiUrl.post('users', {username, email, password});
   } catch(error) {
      throw error;
   }    
}

export const updateUser = async({id, username, email}) => {
   try {
    return await apiUrl.put(`users/${id}`, {username, email});
   } catch(error) {
    throw error;
   }    
}

export const removeUser = async(id) => {
   try {
    return await apiUrl.delete(`users/${id}`);
   } catch(error) {
    console.log(error); 
    return null;
   }    
}