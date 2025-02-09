import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "./api";


export const getNotes = async () => {
    try {
        const userId = await AsyncStorage.getItem('userDetails');
        const result = await api.get(`note/getNote?userid=${JSON.parse(userId).userid}`);
        return result.data;
    } catch (error) {
        console.error("GetNotesErr: ", error.response.data || error.message);
        throw error.response?.data?.message || error.message || 'An error occured';
    }
}