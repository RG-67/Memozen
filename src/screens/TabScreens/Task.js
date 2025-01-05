import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/Colors";
import F6Icon from 'react-native-vector-icons/FontAwesome6'
import MIcon from 'react-native-vector-icons/MaterialIcons';
import TaskData from "../../SampleModel/TasksData";
import IOIcon from 'react-native-vector-icons/Ionicons';


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

const monthList = ({ item }) => (
    <Pressable onPress={() => { }}>
        <View style={styles.monthContainer}>
            <Text style={styles.monthOrDay}>{item.month}</Text>
            <Text style={styles.day}>{item.day}</Text>
            <Text style={styles.monthOrDay}>{item.dayShort}</Text>
        </View>
    </Pressable>
);

const taskTagRenderItem = ({ item }) => (
    <Pressable onPress={() => { }}>
        <View style={styles.taskTagContainer}>
            <Text style={styles.taskText}>{item.tag}</Text>
        </View>
    </Pressable>
);

const taskList = ({ item }) => (
    <Pressable onPress={() => { }}>
        <View style={styles.taskListContainer}>
            <View style={styles.firstView}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <View style={{backgroundColor: item.iconBg, ...styles.taskIconBg}}>
                <IOIcon name={item.iconName} color={item.iconColor} size={15}/>
                </View>
            </View>
            <Text style={styles.task}>{item.task}</Text>
            <View style={styles.secondView}>
                <F6Icon name="clock" color={Colors.colorPrimary} size={10}/>
                <Text style={{color: Colors.colorPrimary, fontSize: 12, fontWeight: '200'}}>{item.time}</Text>
                <Text style={{backgroundColor: item.tagBg, color: item.tagColor}}>{item.tag}</Text>
            </View>
        </View>
    </Pressable>
)


const Task = () => {
    const dates = getCurrentMontheDates();
    const dummyTaskText = [{ id: 1, tag: "All" }, { id: 2, tag: "To do" }, { id: 3, tag: "In Progress" }, { id: 4, tag: "Done" }, { id: 5, tag: "Collaboration" }];

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
                    data={dates}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
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
                <FlatList
                    data={TaskData}
                    keyExtractor={(item) => item.id}
                    renderItem={taskList} />
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
        marginTop: 10,
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    taskTitle: {
        color: Colors.black,
        fontSize: 13,
        fontWeight: '300'
    },
    taskIconBg: {
        borderRadius: 10,
        width: 30,
        height: 30,
        justifyContent: 'center'
    },
    task: {
        color: Colors.black,
        fontWeight: 'bold',
        fontSize: 16
    },
    secondView: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        alignContent: 'center',
        marginVertical: 10
    }
});


export default Task;