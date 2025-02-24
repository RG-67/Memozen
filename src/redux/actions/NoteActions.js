import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from "../../services/noteApi";
import api from "../../services/api";



export const getNotesByUserId = () => async (dispatch) => {
    try {
        dispatch({ type: 'NOTE_USER_REQUEST' });
        const result = await getNotes();
        dispatch({ type: 'NOTE_USER_SUCCESS', payload: result });
        return result;
    } catch (error) {
        dispatch({ type: 'NOTE_USER_FAILED', payload: error });
        throw error;
    }
}


export const getNoteByNoteId = (noteId) => async (dispatch) => {
    try {
        dispatch({ type: 'GET_NOTE_REQUEST' });
        const result = await getNoteById(noteId);
        dispatch({ type: 'GET_NOTE_SUCCESS', payload: result });
        return result;
    } catch (error) {
        dispatch({ type: 'GET_NOTE_FAILURE', payload: error });
        throw error;
    }
}


export const updateNoteById = (noteid, title, content, tag) => async (dispatch) => {
    try {
        dispatch({ type: 'UPDATE_NOTE_REQUEST' });
        const result = await updateNote(noteid, title, content, tag);
        dispatch({ type: 'UPDATE_NOTE_SUCCESS', payload: result });
        return result;
    } catch (error) {
        dispatch({ type: 'UPDATE_NOTE_FAILURE', payload: error });
        throw error;
    }
}

export const deleteNoteById = (noteid) => async (dispatch) => {
    try {
        dispatch({ type: 'DELETE_NOTE_REQUEST' });
        const result = await deleteNote(noteid);
        dispatch({ type: 'DELETE_NOTE_SUCCESS', payload: result });
        return result;
    } catch (error) {
        dispatch({ type: 'DELETE_NOTE_FAILURE', payload: error });
        throw error;
    }
}


export const createUserNote = (title, content, tag) => async (dispatch) => {
    try {
        dispatch({ type: 'CREATE_NOTE_REQUEST' });
        const result = await createNote(title, content, tag);
        dispatch({ type: 'CREATE_NOTE_SUCCESS', payload: result });
        return result;
    } catch (error) {
        dispatch({ type: 'CREATE_NOTE_FAILURE', payload: error });
        throw error;
    }
}