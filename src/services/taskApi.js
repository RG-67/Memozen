import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "./api"



export const getTasksByUser = async () => {
    try {
        const userId = await (AsyncStorage.getItem('userDetails'));
        const result = await api.get(`/task/getTask?userid=${JSON.parse(userId).userid}`);
        return result.data;
    } catch (error) {
        console.error("GetTasksByUserId: ", error.response?.data || error.message);
        throw error.response?.data?.message || error.message || 'An error occured';
    }
}


export const getGroupTask = async () => {
    try {
        const userId = await AsyncStorage.getItem('userDetails');
        const result = await api.get(`/task/getGroupTask?userid=${JSON.parse(userId).userid}`);
        return result.data;
    } catch (error) {
        console.error("GetGroupTask: ", error.response?.data || error.message);
        throw error.response?.data?.message || error.message || 'An error occurred';
    }
}


export const getTaskById = async (taskId) => {
    try {
        const result = await api.get(`task/getTaskById?taskId=${taskId}`);
        return result.data;
    } catch (error) {
        console.error("GetTaskByIdErr: ", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

export const updatePersonalTask = async (taskId, title, desc, dueDate, prior, catg, stat) => {
    try {
        const userId = await AsyncStorage.getItem('userDetails');
        const result = await api.post("task/update",
            { title: title, description: desc, deadline: dueDate, priority: prior, category: catg, status: stat },
            { params: { userid: JSON.parse(userId).userid, taskid: taskId } }
        );
        return result.data;
    } catch (error) {
        console.error("UpdateTaskErr: ", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}


export const getGroupTaskPerPerson = async (taskid) => {
    try {
        const userid = await AsyncStorage.getItem('userDetails');
        const result = await api.get('task/getGroupTaskPerUser', { params: { userid: JSON.parse(userid).userid, taskid } });
        return result.data;
    } catch (error) {
        console.error("GetGrpTaskByUserErr: ", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}