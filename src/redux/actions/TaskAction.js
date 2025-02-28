import { getGroupByUserId } from "../../services/groupApi";
import { getGroupTask, getGroupTaskPerPerson, getTaskById, getTasksByUser, updatePersonalTask } from "../../services/taskApi";




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


export const getTaskByTaskId = (taskId) => async (dispatch) => {
    try {
        dispatch({ type: 'SINGLE_TASK_REQUEST' });
        const result = await getTaskById(taskId);
        dispatch({ type: 'SINGLE_TASK_SUCCESS', payload: result });
        return result;
    } catch (error) {
        dispatch({ type: 'SINGLE_TASK_FAILURE', payload: error });
        throw error;
    }
}


export const updateTask = (taskId, title, desc, dueDate, prior, catg, stat) => async (dispatch) => {
    try {
        dispatch({ type: 'TASK_UPDATE_REQUEST' });
        const result = await updatePersonalTask(taskId, title, desc, dueDate, prior, catg, stat);
        dispatch({ type: 'TASK_UPDATE_SUCCESS', payload: result });
        return result;
    } catch (error) {
        dispatch({ type: 'TASK_UPDATE_FAILURE', payload: error });
        throw error;
    }
}

export const getGroupTaskByUser = (taskid) => async (dispatch) => {
    try {
        dispatch({ type: 'GROUP_TASKS_REQUEST' });
        const result = await getGroupTaskPerPerson(taskid);
        dispatch({ type: 'GROUP_TASKS_SUCCESS', payload: result });
        return result;
    } catch (error) {
        dispatch({ type: 'GROUP_TASKS_FAILURE', payload: error });
        throw error;
    }
}