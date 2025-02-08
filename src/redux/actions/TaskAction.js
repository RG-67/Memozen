import { getGroupTask, getTasksByUser } from "../../services/taskApi";




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


export const getGroupTaskByUserId = () => async (dispatch) => {
    try {
        dispatch({ type: 'GROUP_TASK_REQUEST' });
        const result = await getGroupTask();
        dispatch({ type: 'GROUP_TASK_SUCCESS', payload: result });
        return result;
    } catch (error) {
        dispatch({ type: 'GROUP_TASK_FAILURE', payload: error });
        throw error;
    }
}