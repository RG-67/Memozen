import axios from "axios";


const api = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});


api.interceptors.request.use(
    (config) => {
        const token = process.env.BEARER_TOKEN
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error(`401 error response ==> ${error.response}`);
        }
        return Promise.reject(error);
    }
);  


export default api;