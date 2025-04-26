import api from "./api"



export const getGroupByUserId = async (userId) => {
    try {
        const result = await api.get(`/group/getGroupByUserId/${userId}`);
        return result.data;
    } catch (error) {
        console.error("GetGroupByUserIdErr: ", error.response?.data || error.message);
        throw error.response?.data?.message || error.message || 'An error occured';
    }
}

export const getGroupByGroupId = async(groupId) => {
    try {
        const result = await api.get(`/group/getGroupByGroupId/${groupId}`);
        return result.data;
    } catch (error) {
        console.error("GetGroupMembersErr: ", error.response?.data || error.message);
        throw error.response?.data?.message || error.message || 'An error occures';
    }
}


export const getGroupList = async() => {
    try {
        const result = await api.get('/group/getGroupList');
        return result.data;
    } catch (error) {
        console.error("GetGroupListErr: ", error.response?.data || error.message);
        throw error.response?.data?.message || error.message || 'An error occured';
    }
}