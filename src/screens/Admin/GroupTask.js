import { BackHandler, Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native"
import Colors from "../../styles/Colors";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createGroupTaskByAdmin, getGroupMemberTask, getGroupTaskLists } from "../../redux/actions/GroupActions";
import { Picker } from "@react-native-picker/picker";
import { dateFormatForSend, formatDate, todayDateFormat } from "../../utility/Converter";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { checkGroupTaskValidation } from "../../hooks/GroupValidation";



const NUM_COLUMNS = 2;
const ITEM_GAP = 10;
const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (SCREEN_WIDTH - (ITEM_GAP * (NUM_COLUMNS + 1))) / NUM_COLUMNS;

const MARGIN_HORINTAL = 20
const GAP_BETWEEN_TEXT_INPUT = 5
const ROW_TEXT_INPUT_WIDTH = (SCREEN_WIDTH - ((MARGIN_HORINTAL * 2) + GAP_BETWEEN_TEXT_INPUT)) / 2;


const GroupTask = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [groupTaskList, setGroupTaskList] = useState([]);
    const [form, setForm] = useState(false);
    const [groupList, setGroupList] = useState([]);
    const [groupTask, setGroupTask] = useState({});

    useEffect(() => {
        const backAction = () => {
            if (navigation.canGoBack()) {
                onBackPress();
            }
            return true;
        }
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        const getGroupTasks = async () => {
            try {
                const result = await dispatch(getGroupMemberTask());
                const formatDate = (dateStr) => {
                    const date = new Date(dateStr);
                    return date.toLocaleDateString("en-GB", {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    });
                }
                const formattedTask = result.data.map(task => ({
                    ...task,
                    createdAt: formatDate(task.createdAt),
                    updatedAt: formatDate(task.updatedAt)
                }));
                setGroupTaskList(formattedTask);
            } catch (error) {
                console.log("GetGroupTasks: ", error);
            }
        }
        getGroupTasks();
    }, []);

    const getTaskGroup = async () => {
        try {
            setForm(true);
            setGroupTask(prev => ({
                ...prev,
                deadline: new Date()/* todayDateFormat() */
            }));
            const result = await dispatch(getGroupTaskLists());
            setGroupList(result.data);
        } catch (error) {
            console.log("ResultErr: ", error);
        }
    }

    const setDate = () => {
        DateTimePickerAndroid.open({
            value: groupTask.deadline || new Date(),
            mode: 'date',
            display: 'default',
            onChange: (event, selectedDate) => {
                if (event.type === "set" && selectedDate) {
                    console.log("DATE: ", selectedDate);
                    setGroupTask(prev => ({
                        ...prev,
                        deadline: selectedDate
                    }));
                }
            }
        })
    }

    const createGroupTask = async () => {
        try {
            const check = checkGroupTaskValidation(groupTask);
            if (check) {
                const taskData = {
                    ...groupTask,
                    deadline: dateFormatForSend(groupTask.deadline),
                    groupId: groupTask.groupId.split(" ")[0],
                    category: "Official",
                    status: "Pending",
                    percentage: "0"
                }
                const result = await dispatch(createGroupTaskByAdmin(taskData));
                ToastAndroid.show(result.message, ToastAndroid.SHORT);
                setForm(false);
            }
        } catch (error) {
            console.log("CreateGroupTaskErr: ", error);
        }
    }

    const onBackPress = () => {
        if (!form) {
            setGroupTaskList([]);
            setGroupList([]);
            setGroupTask({});
            setTimeout(() => {
                navigation.goBack();
            }, 100);
        } else {
            setForm(false);
        }
    }

    const groupTaskListRender = ({ item }) => {
        return (
            <TouchableOpacity style={styles.groupTaskCard}>
                <Image source={{ uri: item.groupImage !== "" ? item.groupImage : "https://storage.googleapis.com/pod_public/750/232853.jpg" }} style={styles.groupImage} />
                <Text style={styles.nameText}>{item.groupName}</Text>
                <Text style={{ ...styles.titleText, marginTop: 5 }}>Title: {item.title}</Text>
                <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">Description: {item.description}</Text>
                <Text style={styles.titleText}>Priority: {item.priority}</Text>
                <Text style={styles.titleText}>Status: {item.status}</Text>
                <Text style={styles.titleText}>Created: {item.createdAt}</Text>
                <Text style={{ ...styles.titleText, marginBottom: 10 }}>Updated: {item.updatedAt}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.mainContainer}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => { onBackPress() }}>
                    <Icon size={25} name="arrow-back" style={{ alignself: 'center' }} />
                </Pressable>
                <Text style={styles.title}>
                    {form ? 'Create Group Task' : 'Group Taks'}
                </Text>
            </View>

            {/* Body */}
            {!form ? (
                <>
                    <TouchableOpacity style={styles.btnStyle} onPress={() => { getTaskGroup() }}>
                        <View style={{ flexDirection: 'row' }}>
                            <AntIcon size={25} name="addusergroup" style={{ alignself: 'center', color: Colors.grGreen }} />
                            <Text style={{ ...styles.textStyle, textAlign: 'center', alignSelf: 'center', color: Colors.grGreen }}>Create Group Task</Text>
                        </View>
                        <Icon name="arrow-forward-ios" size={25} style={{ textAlignVertical: 'center', marginEnd: 5, color: Colors.grGreen }} />
                    </TouchableOpacity>

                    <FlatList
                        data={groupTaskList}
                        keyExtractor={(item) => item.taskid}
                        numColumns={NUM_COLUMNS}
                        columnWrapperStyle={{ paddingHorizontal: 5, paddingVertical: 5 }}
                        renderItem={groupTaskListRender}
                        style={{ marginVertical: 10 }}
                    />
                </>
            ) : (
                <View style={styles.mainContainer}>
                    <Text style={{ ...styles.text, marginTop: 20 }}>Title *</Text>
                    <TextInput
                        placeholder="Title"
                        multiline={false}
                        value={groupTask.title || ''}
                        onChangeText={(text) => setGroupTask({ ...groupTask, title: text })}
                        style={{ ...styles.textFormInput, height: 45, marginTop: 5, fontSize: 15, fontWeight: '500', color: Colors.black }}
                    />
                    <Text style={{ ...styles.text, marginTop: 10 }}>Description *</Text>
                    <TextInput
                        placeholder="Description"
                        multiline={true}
                        value={groupTask.description || ''}
                        onChangeText={(text) => setGroupTask({ ...groupTask, description: text })}
                        style={{ ...styles.textFormInput, height: 200, marginTop: 5, fontSize: 15, fontWeight: '400', color: Colors.black, textAlignVertical: 'top' }}
                    />
                    <View style={{ flexDirection: 'row', marginHorizontal: MARGIN_HORINTAL, marginTop: 10 }}>
                        <View>
                            <Text style={{ marginHorizontal: 5, marginBottom: 5, fontSize: 14, fontWeight: 'bold' }}>Deadline *</Text>
                            <Pressable onPress={() => { setDate() }}>
                                <TextInput
                                    placeholder="x/xx/XXXX"
                                    multiline={false}
                                    editable={false}
                                    value={groupTask.deadline ? formatDate(groupTask.deadline) : ''}
                                    onChangeText={(text) => setGroupTask({ ...groupTask, deadline: text })}
                                    style={{
                                        height: 45, width: ROW_TEXT_INPUT_WIDTH, fontSize: 15, fontWeight: '400', color: Colors.black,
                                        borderRadius: 10, backgroundColor: Colors.grey, padding: 10, marginEnd: GAP_BETWEEN_TEXT_INPUT
                                    }}
                                />
                            </Pressable>
                        </View>
                        <View>
                            <Text style={{ marginHorizontal: 5, marginBottom: 5, fontSize: 14, fontWeight: 'bold' }}>Priority *</Text>
                            {/* <Pressable onPress={() => { }}>
                                <TextInput
                                    placeholder="x/xx/XXXX"
                                    multiline={false}
                                    editable={false}
                                    value={groupTask.priority || ''}
                                    onChangeText={(text) => setGroupTask({ ...groupTask, priority: text })}
                                    style={{
                                        height: 45, width: ROW_TEXT_INPUT_WIDTH, fontSize: 15, fontWeight: '400', color: Colors.black,
                                        borderRadius: 10, backgroundColor: Colors.grey, padding: 10, marginEnd: GAP_BETWEEN_TEXT_INPUT
                                    }}
                                />
                            </Pressable> */}
                            <View style={{
                                height: 45, width: ROW_TEXT_INPUT_WIDTH, fontSize: 15,
                                borderRadius: 10, backgroundColor: Colors.grey, padding: 10, marginEnd: GAP_BETWEEN_TEXT_INPUT, justifyContent: 'center'
                            }}>
                                <Picker selectedValue={groupTask.priority} onValueChange={(text) => setGroupTask({ ...groupTask, priority: text })}
                                    style={styles.picker}>
                                    <Picker.Item label="----- Select Priority -----" value="" />
                                    <Picker.Item label="High" value="High" />
                                    <Picker.Item label="Low" value="Low" />
                                </Picker>
                            </View>

                        </View>
                    </View>

                    <Text style={{ ...styles.text, marginTop: 10 }}>Group ID *</Text>
                    <View style={{ ...styles.textFormInput, height: 45, marginTop: 5, fontSize: 15, fontWeight: '400', color: Colors.black, textAlignVertical: 'top', justifyContent: 'center' }}>
                        {/* <TextInput
                            placeholder="----- Select Group ID -----"
                            multiline={true}
                            value={groupTask.groupId || ''}
                            onChangeText={(text) => setGroupTask({ ...groupTask, groupId: text })}
                            
                        /> */}
                        <Picker
                            selectedValue={groupTask.groupId || ''}
                            onValueChange={(itemValue, itemIndex) => setGroupTask(prev => ({ ...prev, groupId: itemValue }))}
                        >
                            <Picker.Item label="----- Select Group ID -----" value="" />
                            {groupList.map((item, index) => (
                                <Picker.Item key={index} label={item.groupId} value={item.groupId} />
                            ))}
                        </Picker>
                    </View>
                    <TouchableOpacity style={{ backgroundColor: Colors.blue, height: 40, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 10, start: 10, end: 10 }}
                        onPress={() => createGroupTask()}
                    >
                        <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 15 }}>Submit</Text>
                    </TouchableOpacity>

                </View>
            )}

        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    header: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 10

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
        height: 45,
        marginHorizontal: 15,
        padding: 5,
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 20,
        borderWidth: 2,
        borderColor: Colors.grGreen,
        elevation: 5,
        backgroundColor: Colors.white,
        justifyContent: 'space-between'
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.charcoal,
        marginStart: 10
    },
    groupTaskCard: {
        width: ITEM_WIDTH,
        minHeight: 100,
        margin: ITEM_GAP / 2,
        borderRadius: 10,
        backgroundColor: Colors.white,
        elevation: 5
    },
    groupImage: {
        width: ITEM_WIDTH,
        height: 80,
        resizeMode: 'stretch',
        borderRadius: 10,
        borderColor: Colors.red,
        borderWidth: 1
    },
    nameText: {
        color: Colors.charcoal,
        fontWeight: 'bold',
        marginHorizontal: 5,
        fontSize: 13,
        marginTop: 5,
        textDecorationLine: 'underline',
        textAlign: 'center'
    },
    titleText: {
        color: Colors.charcoal,
        fontWeight: '500',
        marginHorizontal: 5,
        fontSize: 12
    },
    textFormInput: {
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: Colors.grey,
        padding: 10
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        marginHorizontal: 25,
        // textDecorationLine: 'underline'
    },
    picker: {
        fontWeight: 'bold',
        color: Colors.black,
        fontSize: 15
    }
});


export default GroupTask;