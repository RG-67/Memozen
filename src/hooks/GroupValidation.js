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