import { ToastAndroid } from "react-native"


export const checkGroupValidation = (radioSelected, image, name) => {
    if (radioSelected === null) {
        return ToastAndroid.show("Choose group lead", ToastAndroid.SHORT);
    } else if (image === "") {
        return ToastAndroid.show("Select group image", ToastAndroid.SHORT);
    } else if (name === "") {
        return ToastAndroid.show("Enter group name", ToastAndroid.SHORT);
    }
    return true;
}



export const checkGroupTaskValidation = (taskData) => {
    if (!taskData.title?.trim()) {
        return ToastAndroid.show("Enter title", ToastAndroid.SHORT);
    } else if (!taskData.description?.trim()) {
        return ToastAndroid.show("Enter description", ToastAndroid.SHORT);
    } else if (!taskData.deadline || !(taskData.deadline instanceof Date)) {
        return ToastAndroid.show("Select deadline", ToastAndroid.SHORT);
    } else if (!taskData.priority?.trim()) {
        return ToastAndroid.show("Select priority", ToastAndroid.SHORT);
    } else if (!taskData.groupId?.trim()) {
        return ToastAndroid.show("Group ID should not be empty", ToastAndroid.SHORT);
    }
    return true;
};
