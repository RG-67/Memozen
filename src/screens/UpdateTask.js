import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import Colors from "../styles/Colors";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from "@react-native-picker/picker";
import { useDispatch } from "react-redux";
import { getTaskByTaskId, updateTask } from "../redux/actions/TaskAction";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { taskValidation } from "../hooks/TaskValidation";
import { dateConverter } from "../utility/Converter";



const UpdateTaskScreen = () => {
    const [taskData, setTaskData] = useState({});
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [status, setStatus] = useState('Pending');
    const [priority, setPriority] = useState('High');
    const [category, setCategory] = useState('Official');
    const [createDate, setCreateDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    /* const [fromDate, setFrom] = useState("");
    const [picker, setPicker] = useState(false); */
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch();
    const route = useRoute();
    const navigation = useNavigation();
    const [taskId, setTaskId] = useState("");

    useFocusEffect(
        useCallback(() => {
            const getTask = async () => {
                try {
                    const { taskId } = route.params;
                    setTaskId(taskId);
                    const result = await dispatch(getTaskByTaskId(taskId));
                    if (result) {
                        const createDate = new Date(result.data.created_at).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        });
                        const dueDate = new Date(`${result.data.deadline.substring(0, 4)}-${result.data.deadline.substring(4, 6)}-${result.data.deadline.substring(6, 8)}`).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        });
                        setTaskData(result.data);
                        setTitle(result.data.title);
                        setDesc(result.data.description);
                        setStatus(result.data.status);
                        setPriority(result.data.priority);
                        setCategory(result.data.category);
                        setCreateDate(createDate);
                        setDueDate(dueDate);
                    }
                } catch (error) {
                    console.error("Error: ", error);
                }
            }
            getTask();
        }, [])
    );

    const setRadioOption = (option) => {
        setPriority(option);
    }

    const setTime = () => {
        DateTimePickerAndroid.open({
            value: date,
            mode: 'date',
            display: 'default',
            onChange: (event, selectedDate) => {
                if (event.type === "set" && selectedDate) {
                    const formattedDate = selectedDate.toLocaleDateString("en-BG", {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    });
                    setDueDate(formattedDate.replaceAll('-', ' '));
                }
            }
        });
    }

    const updatePersonalTask = async () => {
        try {
            const taskVal = taskValidation(title, desc);
            if (taskVal) return ToastAndroid.show(taskVal, ToastAndroid.SHORT);
            const deadline = await dateConverter(dueDate);
            const result = await dispatch(updateTask(taskId, title, desc, deadline, priority, category, status));
            ToastAndroid.show("Task Updated Successfully", ToastAndroid.SHORT);
            navigation.goBack();
        } catch (error) {
            console.error("UpdateError ==>", error);
        }
    }


    return (
        <View style={styles.mainContainer}>
            <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}>
                <Pressable onPress={() => { navigation.goBack() }} style={styles.backBtn}>
                    {/* <Text style={{ ...styles.btnTextStyle, color: Colors.black }}>Back</Text> */}
                    <Icon name="arrow-back" size={25} style={{ alignSelf: 'center' }} />
                </Pressable>
                <Text style={styles.title}>Task</Text>
                {/* <Pressable onPress={() => { }} style={{ ...styles.btnStyle, backgroundColor: Colors.red }}>
                    <Text style={{ ...styles.btnTextStyle, color: Colors.white }}>Save</Text>
                </Pressable> */}
            </View>

            <ScrollView>
                <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                    <Text style={styles.textStyle}>Title</Text>
                    <TextInput style={{ ...styles.inputStyle, fontSize: 14, paddingHorizontal: 5, fontWeight: '500' }}
                        value={title}
                        placeholder="Title"
                        numberOfLines={1}
                        keyboardType="default"
                        onChangeText={setTitle}
                    />

                    <Text style={{ ...styles.textStyle, marginTop: 10 }}>Description</Text>
                    <TextInput style={{ ...styles.inputStyle, fontSize: 14, paddingHorizontal: 5, minHeight: 100, textAlignVertical: 'top', fontWeight: '300' }}
                        value={desc}
                        placeholder="Description"
                        multiline
                        keyboardType="default"
                        onChangeText={setDesc}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ ...styles.textStyle, marginTop: 10 }}>Create Date</Text>
                            <View style={{ ...styles.inputStyle, flexDirection: 'row', paddingStart: 5, paddingEnd: 5 }}>
                                <TextInput style={{ fontSize: 14, fontWeight: '400', width: 120, height: 40 }}
                                    value={createDate}
                                    placeholder="Date"
                                    keyboardType="default"
                                    editable={false} />
                                <Icon name="calendar-today" size={20} style={{ alignSelf: 'center' }} />
                            </View>
                        </View>

                        <View>
                            <Text style={{ ...styles.textStyle, marginTop: 10 }}>Due Date</Text>
                            <Pressable onPress={() => { setTime() }}>
                                <View style={{ ...styles.inputStyle, flexDirection: 'row', paddingStart: 5, paddingEnd: 5 }}>
                                    <TextInput style={{ fontSize: 14, fontWeight: '400', width: 120, height: 40 }}
                                        value={dueDate}
                                        placeholder="Date"
                                        keyboardType="default"
                                        editable={false} />
                                    <Icon name="calendar-today" size={20} style={{ alignSelf: 'center' }} />
                                </View>
                            </Pressable>
                        </View>
                    </View>

                    <Text style={{ ...styles.textStyle, marginTop: 10 }}>Priority</Text>
                    <View style={{ flexDirection: 'row', borderRadius: 5, backgroundColor: Colors.grey, padding: 5, marginTop: 5, justifyContent: 'space-between' }}>
                        <Pressable style={[styles.radioBtn, priority === 'High' && styles.selectedRadioBtn]} onPress={() => setRadioOption('High')}>
                            <Text style={[{ fontSize: 15, fontWeight: '500', textAlign: 'center' }, priority === 'High' && { color: Colors.white }]}>High</Text>
                        </Pressable>

                        <Pressable style={[styles.radioBtn, priority === 'Medium' && styles.selectedRadioBtn]} onPress={() => setRadioOption('Medium')}>
                            <Text style={[{ fontSize: 15, fontWeight: '500', textAlign: 'center' }, priority === 'Medium' && { color: Colors.white }]}>Medium</Text>
                        </Pressable>

                        <Pressable style={[styles.radioBtn, priority === 'Low' && styles.selectedRadioBtn]} onPress={() => setRadioOption('Low')}>
                            <Text style={[{ fontSize: 15, fontWeight: '500', textAlign: 'center' }, priority === 'Low' && { color: Colors.white }]}>Low</Text>
                        </Pressable>
                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{}}>
                            <Text style={{ ...styles.textStyle, marginTop: 10 }}>Status</Text>
                            <View style={{ ...styles.inputStyle, width: 150, height: 40, justifyContent: 'center' }}>
                                <Picker
                                    selectedValue={status}
                                    onValueChange={(item) => setStatus(item)}>
                                    <Picker.Item label="Pending" value="Pending" />
                                    <Picker.Item label="In Progress" value="In Progress" />
                                    <Picker.Item label="Completed" value="Completed" />
                                </Picker>
                            </View>
                        </View>

                        <View style={{}}>
                            <Text style={{ ...styles.textStyle, marginTop: 10 }}>Category</Text>
                            <View style={{ ...styles.inputStyle, width: 150, height: 40, justifyContent: 'center' }}>
                                <Picker
                                    selectedValue={category}
                                    onValueChange={(item) => setCategory(item)}>
                                    <Picker.Item label="Official" value="Official" />
                                    <Picker.Item label="Personal" value="Personal" />
                                </Picker>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.saveBtn} onPress={() => { updatePersonalTask() }}>
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>

        </View>
    )
}



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    title: {
        fontWeight: '800',
        fontSize: 18,
        color: Colors.black,
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1
    },
    btnStyle: {
        width: 80,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center'
    },
    btnTextStyle: {
        fontWeight: '600',
        fontSize: 14,
        textAlign: 'center'
    },
    textStyle: {
        color: Colors.charcoal,
        fontWeight: '500',
        fontSize: 15
    },
    inputStyle: {
        color: Colors.black,
        borderWidth: 1.5,
        borderColor: Colors.deepGrey,
        borderRadius: 5,
        marginTop: 5
    },
    radioBtn: {
        justifyContent: 'center',
        height: 40,
        width: 100,
        borderRadius: 5,
        backgroundColor: Colors.orangeLight,
        borderColor: Colors.black
    },
    selectedRadioBtn: {
        justifyContent: 'center',
        height: 40,
        width: 100,
        borderRadius: 5,
        backgroundColor: Colors.orange
    },
    saveBtn: {
        marginHorizontal: 5,
        borderRadius: 10,
        backgroundColor: Colors.grGreen,
        justifyContent: 'center',
        padding: 10,
        marginTop: 50
    },
    saveText: {
        fontSize: 15,
        fontWeight: '500',
        alignSelf: 'center',
        textAlign: 'center',
        color: Colors.white
    },
    backBtn: {
        padding: 5,
        borderWidth: 1,
        borderColor: Colors.charcoal,
        width: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignContent: 'center'
    }
});


export default UpdateTaskScreen;