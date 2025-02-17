import axios from "axios";
import { BASE_URL, BEARER_TOKEN } from '@env';

const url = BASE_URL;
const token = BEARER_TOKEN;

const api = axios.create({
    baseURL: url,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});


api.interceptors.request.use(
    (config) => {
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