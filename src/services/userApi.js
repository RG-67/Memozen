import api from "./api"



export const userRegister = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error response:', error.response?.data || error.message);
        throw error.response?.data?.message || error.message || 'An error occurred';
    }
}

export const userLogin = async (userData) => {
    try {
        const response = await api.post('/auth/login', userData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error response:', error.response?.data || error.message);
        throw error.response?.data?.message || error.message || 'An error occurred';
    }
}

export const getAllUsers = async () => {
    try {
        const response = await api.get('/user/getAllUsers');
        return response.data;
    } catch (error) {
        console.error('Error response:', error.response?.data || error.message);
        throw error.response?.data?.message || error.message || 'An error occurred';
    }
}