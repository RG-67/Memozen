import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from "../styles/Colors";
import { useDispatch } from "react-redux";
import { getGroupTaskByUser } from "../redux/actions/TaskAction";



const GroupTaskScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [where, setFrom] = useState("Home");
    const [taskData, setTaskData] = useState([]);


    useFocusEffect(
        useCallback(() => {
            const fetchGroupTaks = async () => {
                try {
                    const { groupid, taskid, from } = route.params;
                    const result = await dispatch(getGroupTaskByUser(taskid));
                    if (result.data.length > 0) {
                        console.log("GrpTsk: ", result);
                    }
                    // setFrom(from);
                } catch (error) {
                    console.error("GrpTskErr: ", error);
                }
            }
            fetchGroupTaks();
        }, [])
    )


    return (
        <View style={styles.mainContainer}>
            <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}>
                <Pressable onPress={() => { navigation.goBack() }} style={styles.backBtn}>
                    <Icon name="arrow-back" size={25} style={{ alignSelf: 'center' }} />
                </Pressable>
                <Text style={styles.title}>Group Task</Text>
            </View>
            {where === "Home" ? (
                <>

                </>
            ) : (
                <>
                </>
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
});


export default GroupTaskScreen;