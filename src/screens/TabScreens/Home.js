import { Alert, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../styles/Colors";
import Icon from 'react-native-vector-icons/MaterialIcons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CircularProgressBar, { TaskProgressBar } from "../../components/CircularProgressbar";
import ProgressItem from "../../SampleModel/InProgressData";
import InProgressIcon from 'react-native-vector-icons/FontAwesome6'
import LinearProgressBar from "../../components/LinearProgressBar";
import taskGroupData from "../../SampleModel/TasksGroupData";
import IOIcon from 'react-native-vector-icons/Ionicons';
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { getGroupTaskByUserId, getTasksByUserId } from "../../redux/actions/TaskAction";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getGroupByUserId } from "../../services/groupApi";



const tasksGroupRenderItem = ({ item }) => (
    <Pressable onPress={() => { }}>
        <View style={styles.taskMainContainer}>
            <View style={{ backgroundColor: item.iconBgColor, ...styles.taskIconBg }}>
                <IOIcon name={item.iconName} size={25} color={item.iconColor} />
            </View>
            <View style={styles.taskTitleContainer}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskDescription}>{item.tasks} Tasks</Text>
            </View>
            <View style={{ alignSelf: 'flex-end' }}>
                <TaskProgressBar percentage={item.percentage} progressOuterBg={item.progressOuterColor} progressInnerBg={item.progressinnerColor} />
            </View>
        </View>
    </Pressable>
);

const Home = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [userDetails, setUserDetails] = useState({});
    const [inProgressData, setInProgressData] = useState([]);
    const [taskData, setTaskData] = useState({});
    const [groupTask, setGroupTask] = useState([]);
    const [numberOfGrTask, setNumberOfGrTask] = useState(0);


    const inProgressRenderItem = ({ item }) => (
        <Pressable onPress={() => { navigation.navigate('UpdateTaskScreen', {taskId: item.taskid}) }} style={styles.inPrFlat}>
            <View style={{ backgroundColor: item.color, ...styles.inProgressItemContainer }}>
                <View style={styles.inPrView1}>
                    <Text style={styles.text1}>{item.category}</Text>
                    <View style={{ backgroundColor: item.iconBgColor, ...styles.inIconBg }}>
                        <InProgressIcon name={item.imageName} size={12} style={{ color: item.icoColor, ...styles.inIcon }} />
                    </View>
                </View>
                <Text style={styles.inDescription}>{item.title}</Text>
                <View style={styles.linearProgressBg}>
                    <LinearProgressBar percentage={item.percentage} progressColor={item.progressColor} />
                </View>
            </View>
        </Pressable>
    );

    useFocusEffect(
        useCallback(() => {
            const fetchTasks = async () => {
                try {
                    const result = await dispatch(getTasksByUserId());
                    const inPr = result.data.filter(task => task.status === "In Progress");
                    let taskPercentageSum = 0;
                    let inProgress = 0;
                    for (let index = 0; index < result.data.length; index++) {
                        const pos = result.data[index];
                        taskPercentageSum += pos.percentage;
                        if (pos.status === "In Progress") {
                            inProgress += index;
                        }
                    }
                    const formattedinPrData = inPr.map(task => ({
                        ...task,
                        imageName: task.category === "Official" ? "suitcase-rolling" : "circle-user",
                        color: task.category === "Official" ? Colors.skyLight : Colors.orangeLight,
                        iconBgColor: task.category === "Official" ? Colors.inProgressIconBg : Colors.inProgressIconBg2,
                        icoColor: task.category === "Official" ? Colors.inProgressIcon : Colors.colorPrimary,
                        progressColor: task.category === "Official" ? Colors.blue : Colors.orange
                    }));
                    const taskProgress = (taskPercentageSum / result?.totalTasks);
                    setTaskData({ inprogress: inProgress, taskPercentage: taskProgress });
                    setInProgressData(formattedinPrData);
                } catch (error) {
                    console.error("TaskError ==>", error);
                }
            }
            fetchTasks();
        }, [])
    );


    useFocusEffect(
        useCallback(() => {
            const fetchGroupTask = async () => {
                try {
                    const result = await dispatch(getGroupTaskByUserId());
                    const formattedData = result.data.map(task => ({
                        ...task,
                        iconName: task.category === "Official" ? "briefcase" : "book",
                        iconBgColor: task.category === "Official" ? Colors.inProgressIconBg : Colors.orangeLight,
                        iconColor: task.category === "Official" ? Colors.inProgressIcon : Colors.orange,
                        progressOuterColor: task.category === "Official" ? Colors.inProgressIconBg : Colors.orangeLight,
                        progressinnerColor: task.category === "Official" ? Colors.inProgressIcon : Colors.orange
                    }));
                    setGroupTask(formattedData);
                    setNumberOfGrTask(result.totalGroupTasks);
                }
                catch (error) {
                    console.error("GetGroupTaskErr ==>", error);
                }
            }
            fetchGroupTask();
        }, [])
    );

    useEffect(() => {
        const getUserDetails = async () => {
            const userDt = await AsyncStorage.getItem("userDetails");
            setUserDetails(JSON.parse(userDt));
        }
        getUserDetails();
    }, []);


    return (
        <View style={styles.mainContainer}>

            <View style={styles.headerStyle}>
                <Pressable onPress={() => navigation.navigate('Profile')}>
                    <Image source={{ uri: userDetails?.userimage || 'https://storage.googleapis.com/pod_public/750/232853.jpg' }} style={styles.prImage} />
                </Pressable>
                <View style={styles.textContainer}>
                    <Text style={styles.HelloText}>Hello!</Text>
                    <Text style={styles.nameText}>{userDetails?.username}</Text>
                </View>
                <View style={styles.notificationContainer}>
                    <Icon name="notifications" size={22} style={styles.notification} />
                </View>
            </View>


            <ScrollView>
                <View style={styles.cardContainer}>
                    <View style={{ justifyContent: 'space-between' }}>
                        <Text style={styles.textStyle}>Your today's task{"\n"}almost done!</Text>
                        <TouchableOpacity style={styles.viewTaskBtnStyle}>
                            <Text style={styles.taskText}>View Task</Text>
                        </TouchableOpacity>
                    </View>
                    <CircularProgressBar percentage={taskData?.taskPercentage || 0} />
                    <Pressable style={styles.threeDotContainer}>
                        <MIcon name="dots-horizontal" size={20} color={Colors.white} />
                    </Pressable>
                </View>

                <View style={styles.inProgressStyle}>
                    <Text style={styles.inProgress} ellipsizeMode="tail" numberOfLines={1}>In Progress</Text>
                    <Text style={styles.progressText}>{taskData?.inprogress || 0}</Text>
                </View>

                <View style={styles.inPrFlatContainer}>
                    <FlatList
                        data={inProgressData}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.taskid}
                        renderItem={inProgressRenderItem} />
                </View>

                <View style={styles.taskTextContainer}>
                    <Text style={styles.inProgress} ellipsizeMode="tail" numberOfLines={1}>Task Groups</Text>
                    <Text style={styles.progressText}>{numberOfGrTask}</Text>
                </View>

                <View style={styles.taskFlatContainer}>
                    <FlatList
                        data={groupTask}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={styles.taskSeperatorContainer} />}
                        keyExtractor={(item) => item.taskid}
                        renderItem={tasksGroupRenderItem}
                        nestedScrollEnabled />
                </View>

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    headerStyle: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 10,
        justifyContent: 'space-between'
    },

    prImage: {
        height: 60,
        width: 60,
        borderRadius: 50,
        backgroundColor: Colors.thirdColor
    },
    textContainer: {
        marginLeft: 10,
        justifyContent: 'center',
        flex: 1
    },
    HelloText: {
        fontSize: 15,
        color: Colors.black,
        fontWeight: 'medium',
        letterSpacing: 0.2
    },
    nameText: {
        fontSize: 18,
        color: Colors.black,
        fontWeight: 'bold',
    },
    notificationContainer: {
        height: 30,
        width: 30,
        borderRadius: 50,
        backgroundColor: Colors.red,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notification: {
        color: Colors.white
    },
    cardContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        borderRadius: 20,
        backgroundColor: Colors.colorPrimary,
        minHeight: 150,
        top: 10
    },
    textStyle: {
        fontSize: 15,
        fontWeight: '600',
        top: 20,
        left: 20,
        color: Colors.white
    },
    viewTaskBtnStyle: {
        width: 100,
        height: 40,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        left: 20,
        bottom: 20,
        borderRadius: 15
    },
    taskText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: Colors.colorPrimary
    },
    threeDotContainer: {
        width: 30,
        height: 25,
        backgroundColor: Colors.lightestPurple,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        top: 20,
        right: 15,
        alignContent: 'center'
    },
    threeDotText: {
        fontWeight: 'bold',
        color: Colors.white,
        alignSelf: 'center'
    },
    inProgressStyle: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginTop: 15
    },
    inProgress: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    progressText: {
        left: 5,
        borderRadius: 30,
        fontSize: 10,
        backgroundColor: Colors.transPurple,
        color: Colors.lightPurple,
        alignSelf: 'center',
        alignContent: 'center',
        textAlign: 'center',
        verticalAlign: 'middle',
        width: 18,
        height: 18,
        fontWeight: 'bold',
        top: 2
    },
    inProgressItemContainer: {
        width: 220,
        height: 150,
        borderRadius: 15,
        marginHorizontal: 10,
        top: 10,
        justifyContent: 'space-evenly'
    },
    inPrView1: {
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text1: {
        color: Colors.lightGrey,
        fontSize: 14,
        fontWeight: '500'
    },
    inIconBg: {
        width: 25,
        height: 25,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inIcon: {
        alignSelf: 'center'
    },
    inDescription: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black,
        marginHorizontal: 10,
        bottom: 10
    },
    linearProgressBg: {
        marginHorizontal: 10,
        bottom: 15
    },
    taskMainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: Colors.white,
        alignItems: 'center',
        elevation: 1,
        bottom: 5,
        margin: 5
    },
    taskIconBg: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    taskTitleContainer: {
        right: 40
    },
    taskTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        color: Colors.black
    },
    taskDescription: {
        fontWeight: 'normal',
        fontSize: 13,
        color: Colors.black
    },
    inPrFlatContainer: {
        marginBottom: 10
    },
    taskTextContainer: {
        flexDirection: 'row',
        marginHorizontal: 10
    },
    taskFlatContainer: {
        marginBottom: 70
    },
    taskSeperatorContainer: {
        height: 5
    },
    inPrFlat: {
        marginBottom: 10
    }
});

export default Home;