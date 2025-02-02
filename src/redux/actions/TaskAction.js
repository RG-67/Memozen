import { getTasksByUser } from "../../services/taskApi";




export const getTasksByUserId = () => async (dispatch) => {
    try {
        dispatch({ type: 'USER_TASK_REQUEST' });
        const result = await getTasksByUser();
        dispatch({ type: 'USER_TASK_SUCCESS', payload: result });
        return result;
    } catch (error) {
        dispatch({ type: 'USER_TASK_FAILURE', payload: error });
        throw error;
    }
}