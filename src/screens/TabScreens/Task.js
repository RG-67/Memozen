import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/Colors";
import F6Icon from 'react-native-vector-icons/FontAwesome6'
import MIcon from 'react-native-vector-icons/MaterialIcons';
import TaskData from "../../SampleModel/TasksData";
import IOIcon from 'react-native-vector-icons/Ionicons';
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getTasksByUserId } from "../../redux/actions/TaskAction";
import { useFocusEffect } from "@react-navigation/native";


const today = new Date().getDate();

const getCurrentMontheDates = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dates = [];

    for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
        const date = new Date(year, month, day);
        dates.push({
            id: day.toString(),
            month: date.toLocaleString('default', { month: 'short' }),
            day: day,
            dayShort: date.toLocaleString('default', { weekday: 'short' })
        });
    }

    return dates;
}

const monthList = ({ item }) => {
    const isToday = item.day === today;
    const isPastDate = item.day < today;
    return (
        <Pressable onPress={() => { }}>
            <View style={[styles.monthContainer, isToday && { backgroundColor: Colors.colorPrimary }, isPastDate && { backgroundColor: Colors.grey }]}>
                <Text style={[styles.monthOrDay, isToday && { color: Colors.white }]}>{item.month}</Text>
                <Text style={[styles.day, isToday && { color: Colors.white }]}>{item.day}</Text>
                <Text style={[styles.monthOrDay, isToday && { color: Colors.white }]}>{item.dayShort}</Text>
            </View>
        </Pressable>
    )
}


/* const taskTagRenderItem = ({ item }) => {
    const tag = item.tag === "All";
    return (
        <Pressable onPress={() => { }}>
            <View style={[styles.taskTagContainer, tag && { backgroundColor: Colors.colorPrimary }]}>
                <Text style={[styles.taskText, tag && { color: Colors.white }]}>{item.tag}</Text>
            </View>
        </Pressable>
    )
} */

const taskList = ({ item }) => (
    <Pressable onPress={() => { }}>
        <View style={styles.taskListContainer}>
            <View style={styles.firstView}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <View style={{ backgroundColor: item.iconBg, ...styles.taskIconBg }}>
                    <IOIcon name={item.iconName} color={item.iconColor} size={12} />
                </View>
            </View>
            <Text style={styles.task}>{item.description}</Text>
            <View style={styles.secondView}>
                <View style={styles.timeStyle}>
                    <F6Icon name="clock" color={Colors.colorPrimary} size={10} />
                    <Text style={styles.time}>{item.createTime}</Text>
                </View>
                <View style={{ backgroundColor: item.tagBg, ...styles.tagStyleView }}>
                    <Text style={{ color: item.tagColor, ...styles.tagTextStyle }}>{item.status}</Text>
                </View>
            </View>
        </View>
    </Pressable>
)


const Task = () => {
    const dispatch = useDispatch();
    const [taskData, setTaskData] = useState([]);
    const [itemTag, setTag] = useState("All");
    const [filteredList, setFilteredList] = useState([]);
    const dates = getCurrentMontheDates();
    const dummyTaskText = [{ id: 1, tag: "All" }, { id: 2, tag: "To do" }, { id: 3, tag: "In Progress" }, { id: 4, tag: "Completed" }, { id: 5, tag: "Collaboration" }];

    const flatListRef = useRef(null);
    const todayIndex = dates.findIndex(item => item.day === today);

    useEffect(() => {
        if (flatListRef.current && todayIndex !== -1) {
            setTimeout(() => {
                flatListRef.current.scrollToIndex({ index: todayIndex, animated: false, viewPosition: -0.8 });
            }, 100);
        }
    }, [dates, todayIndex]);



    useFocusEffect(
        useCallback(() => {
            const fetchTasks = async () => {
                try {
                    const result = await dispatch(getTasksByUserId());
                    const formattedData = result?.data.map(task => ({
                        ...task,
                        iconName: task.category === "Official" ? "briefcase" : "book",
                        iconBg: task.category === "Official" ? Colors.inProgressIconBg : Colors.orangeLight,
                        iconColor: task.category === "Official" ? Colors.inProgressIcon : Colors.orange,
                        tagBg: task.status === "Completed" ? Colors.inProgressIconBg2 : Colors.inProgressIconBg,
                        tagColor: task.status === "Completed" ? Colors.colorPrimary : Colors.inProgressIcon
                    }));
                    setTaskData(formattedData);
                    setFilteredList(formattedData);
                } catch (error) {
                    console.error("TaskResultErr ==>", error);
                }
            }

            fetchTasks();
        }, [])
    );

    const filteredTask = (selectedTask) => {
        setTag(selectedTask);
        if (selectedTask === "All") {
            setFilteredList(taskData);
        } else {
            const filterList = taskData.filter(task => task.status === selectedTask);
            setFilteredList(filterList);
        }
    }


    const taskTagRenderItem = ({ item }) => {
        const tag = item.tag === itemTag;
        return (
            <Pressable onPress={() => { filteredTask(item.tag) }}>
                <View style={[styles.taskTagContainer, tag && { backgroundColor: Colors.colorPrimary }]}>
                    <Text style={[styles.taskText, tag && { color: Colors.white }]}>{item.tag}</Text>
                </View>
            </Pressable>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerStyle}>
                <Pressable onPress={() => { }}>
                    <F6Icon name="arrow-left-long" size={25} />
                </Pressable>
                <Text style={styles.heading}>Today's Tasks</Text>
                <View>
                    <MIcon name="notifications" size={30} />
                </View>
            </View>


            <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                <FlatList
                    ref={flatListRef}
                    data={dates}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                    getItemLayout={(data, index) => ({ length: 80, offset: index * (80 + 10), index })}
                    initialScrollIndex={todayIndex !== -1 ? Math.max(todayIndex - 2, 0) : 0}
                    // initialScrollIndex={todayIndex !== -1 ? todayIndex : 0}
                    renderItem={monthList} />
            </View>

            <View style={{ marginTop: 20, marginHorizontal: 10 }}>
                <FlatList
                    data={dummyTaskText}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
                    renderItem={taskTagRenderItem}
                />
            </View>

            <ScrollView>
                <View style={{ marginTop: 20, marginHorizontal: 10, marginBottom: 70 }}>
                    {filteredList.length > 0 ? (
                        <FlatList
                            data={filteredList}
                            keyExtractor={(item) => item.taskid}
                            renderItem={taskList} />
                    ) : (
                        <View style={{justifyContent: 'center', alignContent: 'center', marginTop: 50}}>
                            <IOIcon name="clipboard-outline" size={50} style={{color: Colors.lightGrey, alignSelf: 'center'}}/>
                            <Text style={{fontWeight: '500', fontSize: 15, alignSelf: 'center', color: Colors.lightGrey, marginTop: 10}}>No tasks available</Text>
                        </View>
                    )}

                </View>
            </ScrollView>

        </View>
    )
};



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    headerStyle: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.black,
        alignSelf: 'center'
    },
    monthContainer: {
        width: 80,
        height: 100,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 8,
        backgroundColor: Colors.white,
        elevation: 4,
        margin: 5
    },
    monthOrDay: {
        fontSize: 14,
        color: Colors.black,
        fontWeight: '400'
    },
    day: {
        fontSize: 16,
        color: Colors.black,
        fontWeight: 'bold'
    },
    taskTagContainer: {
        height: 30,
        borderRadius: 10,
        backgroundColor: Colors.inProgressIconBg2,
        justifyContent: 'center',
        alignItems: 'center',

    },
    taskText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: Colors.colorPrimary,
        marginHorizontal: 20
    },
    taskListContainer: {
        borderRadius: 10,
        backgroundColor: Colors.white,
        elevation: 2,
        margin: 5
    },
    firstView: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'space-between',
        alignContent: 'center',
        marginHorizontal: 10
    },
    taskTitle: {
        color: Colors.black,
        fontSize: 12,
        fontWeight: '400'
    },
    taskIconBg: {
        borderRadius: 8,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    task: {
        color: Colors.black,
        fontWeight: 'bold',
        fontSize: 15,
        marginHorizontal: 10
    },
    secondView: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        alignContent: 'center',
        marginTop: 10,
        marginBottom: 15,
        marginHorizontal: 10
    },
    timeStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    time: {
        color: Colors.colorPrimary,
        fontSize: 12,
        fontWeight: '400',
        marginStart: 8,
        alignSelf: 'center'
    },
    tagStyleView: {
        borderRadius: 10
    },
    tagTextStyle: {
        fontSize: 10,
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginVertical: 2
    }
});


export default Task;