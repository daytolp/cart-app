import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

const apiUrl = axios.create({
    baseURL: VITE_API_URL
});

apiUrl.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        "Authorization": sessionStorage.getItem('token')
    }
    return config;
})

export default apiUrl;