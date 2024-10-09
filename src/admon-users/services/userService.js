import apiUrl from "../../api/api";

const config = () => {
   return {
      headers: {
         "Authorization": sessionStorage.getItem('token'),
         "Content-Type": "application/json",
      }
   }
}
export const getAll = async() => {
   try {
    return await apiUrl.get('users');
   } catch(error) {
    console.log(error); 
   }    
}

export const saveUser = async({username, email, password}) => {
   try {
    return await apiUrl.post('users', {username, email, password}, config());
   } catch(error) {
      throw error;
   }    
}

export const updateUser = async({id, username, email}) => {
   try {
    return await apiUrl.put(`users/${id}`, {username, email}, config());
   } catch(error) {
    throw error;
   }    
}

export const removeUser = async(id) => {
   try {
    return await apiUrl.delete(`users/${id}`, config());
   } catch(error) {
    console.log(error); 
    return null;
   }    
}