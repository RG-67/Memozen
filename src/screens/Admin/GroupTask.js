import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Colors from "../../styles/Colors";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getGroupMemberTask } from "../../redux/actions/GroupActions";



const NUM_COLUMNS = 2;
const ITEM_GAP = 10;
const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (SCREEN_WIDTH - (ITEM_GAP * (NUM_COLUMNS + 1))) / NUM_COLUMNS;


const GroupTask = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [groupTaskList, setGroupTaskList] = useState([]);

    useEffect(() => {
        const getGroupTasks = async () => {
            try {
                const result = await dispatch(getGroupMemberTask());
                setGroupTaskList(result.data);
                console.log("Tasks: ", result.data);
            } catch (error) {
                console.log("GetGroupTasks: ", error);
            }
        }
        getGroupTasks();
    }, []);

    const groupTaskListRender = ({ item }) => {
        const createDate = new Date(item.createdAt).toLocaleDateString("en-GB", {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });

        const updateDate = new Date(item.updatedAt).toLocaleDateString("en-GB",  {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });

        return (
            <TouchableOpacity style={styles.groupTaskCard}>
                <Image source={{ uri: item.groupImage !== "" ? item.groupImage : "https://storage.googleapis.com/pod_public/750/232853.jpg" }} style={styles.groupImage} />
                <Text style={styles.nameText}>{item.groupName}</Text>
                <Text style={{...styles.titleText, marginTop: 5}}>Title: {item.title}</Text>
                <Text style={styles.titleText}>Description: {item.description}</Text>
                <Text style={styles.titleText}>Priority: {item.priority}</Text>
                <Text style={styles.titleText}>Status: {item.status}</Text>
                <Text style={styles.titleText}>Created: {createDate}</Text>
                <Text style={{...styles.titleText, marginBottom: 10}}>Updated: {updateDate}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.mainContainer}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => { navigation.goBack() }}>
                    <Icon size={25} name="arrow-back" style={{ alignself: 'center' }} />
                </Pressable>
                <Text style={styles.title}>
                    Group Taks
                </Text>
            </View>

            {/* Body */}
            <TouchableOpacity style={styles.btnStyle} onPress={() => { }}>
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
                style={{marginVertical: 10}}
            />

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
    }
});


export default GroupTask;