import axios from "axios"
import api from "./api"



export const userRegister = async (userData) => {
    try {
        const response = await api.post('/auth/register');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}