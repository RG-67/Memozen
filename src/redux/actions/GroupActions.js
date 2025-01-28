import { getGroupByGroupId, getGroupByUserId } from "../../services/groupApi";



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
        dispatch({type: 'GROUP_MEMBERS_REQUEST'});
        const result = await getGroupByGroupId(groupId);
        dispatch({type: 'GROUP_MEMBER_SUCCESS', payload: result});
        return result
    } catch (error) {
        dispatch({type: 'GROUP_MEMBER_FAILURE', payload: error});
        throw error;
    }
}