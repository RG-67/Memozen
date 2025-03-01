import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from "../styles/Colors";
import { useDispatch } from "react-redux";
import { getGroupTaskByUser } from "../redux/actions/TaskAction";


const ITEM_GAP = 5;
const SCREEN_WIDTH = Dimensions.get('window').width;
const NUMBER_OF_COLUMNS = 2;
const ITEM_WIDTH = (SCREEN_WIDTH - ITEM_GAP * (NUMBER_OF_COLUMNS + 1)) / NUMBER_OF_COLUMNS;

const GroupTaskScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [where, setFrom] = useState("");
    const [taskData, setTaskData] = useState([]);


    useFocusEffect(
        useCallback(() => {
            const fetchGroupTaks = async () => {
                try {
                    const { groupid, taskid, from } = route.params;
                    const result = await dispatch(getGroupTaskByUser(taskid));
                    if (result.data.length > 0) {
                        const formattedData = result.data.map(task => ({
                            ...task,
                            progress: task.status === "Pending" ? 0
                                : task.status === "In Progress" ? 40
                                    : task.status === "Completed" ? 100
                                        : 20
                        }));
                        setTaskData(formattedData);
                        setFrom(from);
                    }
                } catch (error) {
                    console.error("GrpTskErr: ", error);
                }
            }
            fetchGroupTaks();
        }, [])
    );


    const renderTaskList = ({ item }) => {
        return (
            <Pressable onPress={() => { }} style={styles.renderTask}>
                <Text>{item.title}</Text>
                <Text>{item.description}</Text>
            </Pressable>
        )
    }


    return (
        <View style={styles.mainContainer}>
            <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}>
                <Pressable onPress={() => { navigation.goBack() }} style={styles.backBtn}>
                    <Icon name="arrow-back" size={25} style={{ alignSelf: 'center' }} />
                </Pressable>
                <Text style={styles.title}>Group Task</Text>
            </View>
            {where === "Home" ? (
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <FlatList
                        data={taskData}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{padding: 10}}
                        renderItem={renderTaskList}
                    />
                </View>
            ) : (
                <View>

                </View>
            )}

        </View>
    )
}



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
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
        borderRadius: 15,
        backgroundColor: Colors.white,
        margin: ITEM_GAP / 2
    }
});


export default GroupTaskScreen;