import apiUrl from "../../api/api";

export const getAll = async() => {
   try {
    return await apiUrl.get('users');
   } catch(error) {
    console.log(error); 
   }    
}

export const saveUser = async({username, email, password, admin}) => {
   try {
    return await apiUrl.post('users', {username, email, password, admin});
   } catch(error) {
      throw error;
   }    
}

export const updateUser = async({id, username, email, admin}) => {
   try {
    return await apiUrl.put(`users/${id}`, {username, email, admin});
   } catch(error) {
    throw error;
   }    
}

export const removeUser = async(id) => {
   try {
    return await apiUrl.delete(`users/${id}`);
   } catch(error) {
      throw error;
   }    
}