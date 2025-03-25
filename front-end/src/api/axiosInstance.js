import axios from "axios"

export const api = axios.create({
    baseURL: 'https://your-api.com',
});
  
api.interceptors.request.use(
(config) => {
    const token = localStorage.getItem('token'); // Get latest token
    if (token) {
    config.headers.Authorization = token;
    }
    return config;
},
(error) => Promise.reject(error)
);
  