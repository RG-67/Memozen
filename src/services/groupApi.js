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

export const getGroupByGroupId = async (groupId) => {
    try {
        const result = await api.get(`/group/getGroupByGroupId/${groupId}`);
        return result.data;
    } catch (error) {
        console.error("GetGroupMembersErr: ", error.response?.data || error.message);
        throw error.response?.data?.message || error.message || 'An error occures';
    }
}


export const getGroupList = async () => {
    try {
        const result = await api.get('/group/getGroupList');
        return result.data;
    } catch (error) {
        console.error("GetGroupListErr: ", error.response?.data || error.message);
        throw error.response?.data?.message || error.message || 'An error occured';
    }
}


export const createGroup = async (adminId, groupName, userId, image) => {
    try {
        const formData = new FormData();
        formData.append('adminid', adminId);
        formData.append('groupname', groupName);
        formData.append('userid', JSON.stringify(userId));
        let imageFile;
        if (image) {
            imageFile = {
                uri: image.uri,
                name: image.fileName || 'photo.jpg',
                type: image.type || 'image/jpeg'
            };
            formData.append('image', imageFile);
        }
        console.log("ImageFile: ", imageFile);
        const result = await api.post('group/createGroup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return result.data;
    } catch (error) {
        console.error("CreateGroupErr: ", error.response?.data || error.message);
        throw error.response?.data?.message || error.message || 'An error occured';
    }
}


export const getGroupTaskList = async () => {
    try {
        const result = await api.get('group/getGroupTaskList');
        return result.data;
    } catch (error) {
        console.error("GetGroupTaskErr: ", error.response?.data || error.message);
        throw error.response?.data?.message || error.message || 'An error occured';
    }
}