import { createGroup, createGroupTask, getGroupByGroupId, getGroupByUserId, getGroupList, getGroupTaskList, getTaskGroupList } from "../../services/groupApi";



export const getGroupByUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: 'USER_GROUP_REQUEST' });
        const result = await getGroupByUserId(userId);
        dispatch({ type: 'USER_GROUP_SUCCESS', payload: result });
        return result;
    } catch (error) {
        dispatch({ type: 'USER_GROUP_FAILURE', payload: error });
        throw error;
    }
};


export const getGroupMembesrByGroupId = (groupId) => async (dispatch) => {
    try {
        dispatch({ type: 'GROUP_MEMBERS_REQUEST' });
        const result = await getGroupByGroupId(groupId);
        dispatch({ type: 'GROUP_MEMBER_SUCCESS', payload: result });
        return result;
    } catch (error) {
        dispatch({ type: 'GROUP_MEMBER_FAILURE', payload: error });
        throw error;
    }
}

export const getGroupLists = () => async (dispatch) => {
    try {
        dispatch({ type: 'GROUP_LIST_REQUEST' });
        const result = await getGroupList();
        dispatch({ type: 'GROUP_LIST_SUCCESS', payload: result });
        return result;
    } catch (error) {
        dispatch({ type: 'GROUP_LIST_FAILURE', payload: error });
        throw error;
    }
}


export const createMemberGroup = (adminId, groupName, userId, image) => async (dispatch) => {
    try {
        dispatch({ type: 'GROUP_CREATE_REQUEST' });
        const result = await createGroup(adminId, groupName, userId, image);
        dispatch({ type: 'GROUP_CREATE_SUCCESS', payload: result });
        return result;
    } catch (error) {
        dispatch({ type: 'GROUP_CREATE_FAILURE', payload: error });
        throw error;
    }
}


export const getGroupMemberTask = () => async (dispatch) => {
    try {
        dispatch({ type: 'GROUP_TASKS_REQUEST' });
        const result = await getGroupTaskList();
        dispatch({ type: 'GROUP_TASKS_SUCCESS', payload: result });
        return result;
    } catch (error) {
        dispatch({ type: 'GROUP_TASKS_FAILURE', payload: error });
        throw error;
    }
}

export const getGroupTaskLists = () => async (dispatch) => {
    try {
        dispatch({ type: 'GROUP_TASKS_REQUEST' });
        const result = await getTaskGroupList();
        dispatch({ type: 'GROUP_TASKS_SUCCESS', payload: result });
        return result;
    } catch (error) {
        dispatch({ type: 'GROUP_TASKS_FAILURE', payload: error });
        throw error;
    }
}

export const createGroupTaskByAdmin = (groupTaskData) => async (dispatch) => {
    try {
        dispatch({ type: 'CREATE_TASKS_REQUEST' });
        const result = await createGroupTask(groupTaskData);
        dispatch({ type: 'CREATE_TASKS_SUCCESS', payload: result });
        return result;
    } catch (error) {
        dispatch({ type: 'CREATE_TASKS_FAILURE', payload: error });
        throw error;
    }
}