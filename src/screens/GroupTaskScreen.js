import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Dimensions, FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from "../styles/Colors";
import { useDispatch } from "react-redux";
import { getGroupTaskByUser } from "../redux/actions/TaskAction";
import { LinearProgressBar, TaskLinearProgressBar } from "../components/LinearProgressBar";
import { Picker } from "@react-native-picker/picker";
import CircularProgressBar, { TaskProgressBar } from "../components/CircularProgressbar";


const ITEM_GAP = 10;
const SCREEN_WIDTH = Dimensions.get('window').width;
const NUMBER_OF_COLUMNS = 2;
const ITEM_WIDTH = (SCREEN_WIDTH - ITEM_GAP * (NUMBER_OF_COLUMNS + 1)) / NUMBER_OF_COLUMNS;


const GroupTaskScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [where, setFrom] = useState("");
    const [taskData, setTaskData] = useState([]);
    const [taskId, setTaskId] = useState("");
    const [groupId, setGroupId] = useState("");
    const [taskDetails, setTaskDetails] = useState({});
    const [status, setStatus] = useState("");



    useFocusEffect(
        useCallback(() => {
            fetchGroupTaks();
        }, [])
    );

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, [where]);

    const fetchGroupTaks = async () => {
        try {
            const { groupid, taskid, from } = route.params;
            const result = await dispatch(getGroupTaskByUser(taskid));
            const colorPattern = [Colors.orangeLight, Colors.skyLight, Colors.skyLight, Colors.orangeLight];
            if (result.data.length > 0) {
                const formattedData = result.data.map((task, index) => ({
                    ...task,
                    progress: task.status === "Pending" ? 15
                        : task.status === "In Progress" ? 40
                            : task.status === "Completed" ? 100
                                : 20,
                    backgroundColor: colorPattern[index % 4],
                    statusBg: task.status === "Pending" ? Colors.lightRed
                        : task.status === "In Progress" ? Colors.thirdColor
                            : task.status === "Completed" ? Colors.green
                                : Colors.charcoal,
                    linearPrBg: task.status === "Pending" ? Colors.thirdRed
                        : task.status === "In Progress" ? Colors.progressPurple
                            : task.status === "Completed" ? Colors.progressGreen
                                : Colors.charcoal,
                }));
                // console.log("GrpTs: ", formattedData);
                setTaskData(formattedData);
                setFrom(from);
                setTaskId(result.taskid);
                setGroupId(result.groupid);
            }
        } catch (error) {
            console.error("GrpTskErr: ", error);
        }
    }

    const backAction = () => {
        if (where === "task") {
            fetchGroupTaks();
            return true;
        } else {
            if (navigation.canGoBack()) {
                setTaskData([]);
                setFrom("");
                setTaskId("");
                setGroupId("");
                setTimeout(() => navigation.goBack(), 100);
            }
            return true;
        }
    }

    const showMemberTask = (id, title, description, status, progress) => {
        setFrom("task");
        setTaskDetails({ id, title, description, status, progress });
    }


    const renderTaskList = ({ item }) => {
        return (
            <Pressable onPress={() => { showMemberTask(item.id, item.title, item.description, item.status, item.progress) }} style={{ ...styles.renderTask, backgroundColor: item.backgroundColor }}>
                <View style={{ marginVertical: 5 }}>
                    <Text style={{ marginHorizontal: 10, fontSize: 15, fontWeight: 'bold', color: Colors.black, marginTop: 10 }}>{taskId}</Text>
                    <Text style={{ marginTop: 2, marginHorizontal: 10, fontSize: 13, fontWeight: '500', color: Colors.black }}>{item.title}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 60, flex: 1, justifyContent: 'space-between', marginHorizontal: 5, height: 50 }}>
                        <TaskLinearProgressBar percentage={item.progress} progressColor={item.linearPrBg} />
                        <View style={{
                            width: 60, height: 13, borderRadius: 8, justifyContent: 'center', alignContent: 'center', alignItems: 'center',
                            backgroundColor: item.statusBg, alignSelf: 'center'
                        }}>
                            <Text style={{ fontSize: 8, fontWeight: '500', color: Colors.white, textAlign: 'center' }}>{item.status}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        )
    }


    return (
        <View style={styles.mainContainer}>
            <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}>
                <Pressable onPress={() => { backAction() }} style={styles.backBtn}>
                    <Icon name="arrow-back" size={25} style={{ alignSelf: 'center' }} />
                </Pressable>
                <Text style={styles.title}>Group Task</Text>
            </View>
            {where === "Home" ? (
                <View style={{ marginVertical: 20 }}>
                    <FlatList
                        data={taskData}
                        numColumns={NUMBER_OF_COLUMNS}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 10 }}
                        keyExtractor={(item) => item.id}
                        renderItem={renderTaskList}
                    />
                </View>
            ) : (
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginHorizontal: 10 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: Colors.black, alignSelf: 'center', textAlign: 'center' }}>{taskId}</Text>
                        <View style={{ width: 150, height: 30, borderRadius: 10, backgroundColor: Colors.orangeLight, alignSelf: 'center', justifyContent: 'center', alignContent: 'center' }}>
                            <Picker
                                style={{ padding: 10 }}
                                selectedValue={taskDetails.status}
                                onValueChange={(item) => setStatus(item)}>
                                <Picker.Item label="Pending" value="Pending" style={{ color: Colors.black, fontWeight: '500' }} />
                                <Picker.Item label="In Progress" value="In Progress" />
                                <Picker.Item label="Completed" value="Completed" />
                            </Picker>
                        </View>
                    </View>

                    <View style={{justifyContent: 'space-between', /* marginHorizontal: 10, */ marginTop: 20, flexDirection: 'row'}}>
                        <View>
                            <Text style={{fontSize: 18, fontWeight: 'bold', color: Colors.black}}>{taskDetails.title}</Text>
                            <Text style={{fontSize: 16, fontWeight: '500', color: Colors.black, marginTop: 10}}>{taskDetails.description}</Text>
                        </View>
                        <TaskProgressBar percentage={taskDetails.progress} progressOuterBg={Colors.lightestPurple} progressInnerBg={Colors.colorPrimary}/>
                    </View>
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
    backBtn: {
        padding: 5,
        borderWidth: 1,
        borderColor: Colors.charcoal,
        width: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignContent: 'center'
    },
    title: {
        fontWeight: '800',
        fontSize: 18,
        color: Colors.black,
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1
    },
    renderTask: {
        width: ITEM_WIDTH,
        height: 150,
        borderRadius: 10,
        marginBottom: ITEM_GAP,
        elevation: 2
    }
});


export default GroupTaskScreen;