import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "./api"



export const getTasksByUser = async () => {
    try {
        const userId = await (AsyncStorage.getItem('userDetails'));
        const result = await api.get(`/task/getTask?userid=${JSON.parse(userId).userid}`);
        return result.data;
    } catch (error) {
        console.error("GetTasksByUserId: ", error.response?.data || error.message);
        throw error.response?.data?.message || error.message || 'An error occured';
    }
}