import { getNotes } from "../../services/noteApi";



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