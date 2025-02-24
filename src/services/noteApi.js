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


export const getNoteById = async (noteId) => {
    try {
        const userId = await AsyncStorage.getItem('userDetails');
        const usId = JSON.parse(userId).userid;
        const result = await api.get('note/getNoteByNoteId', { params: { userId: usId, noteId } });
        console.log(result.data);
        return result.data;
    } catch (error) {
        console.error("NoteByIdErr: ", error.response.data || error.message);
        throw error.response?.data?.message || error.message || 'An error occurred';
    }
}


export const updateNote = async (noteid, title, content, tag) => {
    try {
        const userid = await AsyncStorage.getItem('userDetails');
        const usId = JSON.parse(userid).userid;
        const result = await api.put('note/updateNote', { title: title, content: content, tag: tag }, { params: { userid: usId, noteid } });
        return result.data;
    } catch (error) {
        console.error("UpdateNoteErr: ", error.response.data || error.message);
        throw error.response?.data.message || error.message || 'An error occurred';
    }
}


export const deleteNote = async (noteid) => {
    try {
        const userid = await AsyncStorage.getItem('userDetails');
        const usId = JSON.parse(userid).userid;
        const result = await api.delete('note/deleteNote', { params: { userid: usId, noteid } });
        return result.data;
    } catch (error) {
        console.error("NoteByIdErr: ", error.response.data || error.message);
        throw error.response.data?.message || error.message || 'An error occurred';
    }
}


export const createNote = async (title, content, tag) => {
    try {
        const userId = await AsyncStorage.getItem('userDetails');
        const usId = JSON.parse(userId).userid;
        const result = await api.post('note/createNote', { userid: usId, title: title, content: content, tag: tag });
        return result.data;
    } catch (error) {
        console.error("CreateNoteErr: ", error.response?.data || error.message);
        throw error.response?.data.message || error.message || 'An error occurred';
    }
}