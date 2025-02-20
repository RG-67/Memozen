import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../styles/Colors";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from "@react-native-picker/picker";



const UpdateTaskScreen = () => {
    const [taskData, setTaskData] = useState({});
    const [status, setStatus] = useState('Pending');
    const [priority, setPriority] = useState('High');
    const [category, setCategory] = useState('Official');

    useFocusEffect(() => {
        const getTask = async () => {
            const route = useRoute();
            const { taskId } = route.taskid;
            console.log(taskId);
        }
        getTask();
    });

    const setRadioOption = (option) => {
        setPriority(option);
    }

    return (
        <View style={styles.mainContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 10 }}>
                <Pressable onPress={() => { }} style={{ backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.black, ...styles.btnStyle }}>
                    <Text style={{ ...styles.btnTextStyle, color: Colors.black }}>Back</Text>
                </Pressable>
                <Text style={styles.title}>Task</Text>
                <Pressable onPress={() => { }} style={{ ...styles.btnStyle, backgroundColor: Colors.red }}>
                    <Text style={{ ...styles.btnTextStyle, color: Colors.white }}>Save</Text>
                </Pressable>
            </View>

            <ScrollView>
                <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                    <Text style={styles.textStyle}>Title</Text>
                    <TextInput style={{ ...styles.inputStyle, fontSize: 14, paddingHorizontal: 5, fontWeight: '500' }}
                        placeholder="Title"
                        numberOfLines={1}
                        keyboardType="default" />

                    <Text style={{ ...styles.textStyle, marginTop: 10 }}>Description</Text>
                    <TextInput style={{ ...styles.inputStyle, fontSize: 14, paddingHorizontal: 5, minHeight: 100, textAlignVertical: 'top', fontWeight: '300' }}
                        placeholder="Description"
                        multiline
                        keyboardType="default" />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ ...styles.textStyle, marginTop: 10 }}>Create Date</Text>
                            <View style={{ ...styles.inputStyle, flexDirection: 'row', paddingStart: 5, paddingEnd: 5 }}>
                                <TextInput style={{ fontSize: 14, fontWeight: '400', width: 120, height: 40 }}
                                    placeholder="Date"
                                    keyboardType="default" />
                                <Icon name="calendar-today" size={20} style={{ alignSelf: 'center' }} />
                            </View>
                        </View>

                        <View>
                            <Text style={{ ...styles.textStyle, marginTop: 10 }}>Due Date</Text>
                            <View style={{ ...styles.inputStyle, flexDirection: 'row', paddingStart: 5, paddingEnd: 5 }}>
                                <TextInput style={{ fontSize: 14, fontWeight: '400', width: 120, height: 40 }}
                                    placeholder="Date"
                                    keyboardType="default" />
                                <Icon name="calendar-today" size={20} style={{ alignSelf: 'center' }} />
                            </View>
                        </View>
                    </View>

                    <Text style={{ ...styles.textStyle, marginTop: 10 }}>Priority</Text>
                    <View style={{ flexDirection: 'row', borderRadius: 5, backgroundColor: Colors.grey, padding: 10, marginTop: 5, justifyContent: 'space-between' }}>
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
                                    <Picker.Item label="Initiated" value="Initiated" />
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
        alignSelf: 'center'
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
        borderColor: Colors.colorPrimary,
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
    }
});


export default UpdateTaskScreen;