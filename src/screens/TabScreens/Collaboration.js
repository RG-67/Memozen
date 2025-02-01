import { Button, Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Colors from "../../styles/Colors";
import { useEffect, useState } from "react";
import socket, { connectSocket, disconnectSocket } from "../../services/socketService";
import groupModel from "../../SampleModel/GroupModel";
import { getGroupByUser } from "../../redux/actions/GroupActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

const Collaboration = ({ navigation }) => {
    const dispatch = useDispatch();

    const NUM_COLUMNS = 2;
    const WINNDOW_WIDTH = Dimensions.get('window').width;
    const ITEM_GAP = 2;
    const ITEM_WIDTH = (WINNDOW_WIDTH - (ITEM_GAP * (NUM_COLUMNS + 1))) / NUM_COLUMNS;

    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [rooms, setRooms] = useState(null);
    const [data, setData] = useState([]);

    let groupId;

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                const result = await dispatch(getGroupByUser(userId));

                const formattedData = result?.data.map(group => {
                    const defaultImage = 'https://storage.googleapis.com/pod_public/750/232853.jpg';
                    const memberImage = group.groupData.map(member => member.userImage || defaultImage).slice(0, 3);
                    return {
                        ...group,
                        groupImage1: memberImage[0] || defaultImage,
                        groupImage2: memberImage[1] || defaultImage,
                        groupImage3: memberImage[2] || defaultImage
                    }
                });
                setRooms(result?.totalRooms);
                setData(formattedData);
            } catch (error) {
                console.error("ErrorResult ==>", error);
            }
        };
        fetchGroups();
    }, []);


    const groupItemRender = ({ item }) => (
        <Pressable onPress={() => navigation.navigate('MemberScreen', { groupId: item.groupId })}>
            <View style={styles.flatItem}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.groupImage1 }} style={[styles.imageStyle, { zIndex: 3 }]} />
                    <Image source={{ uri: item.groupImage2 }} style={[styles.imageStyle, { marginLeft: -90, zIndex: 2 }]} />
                    <Image source={{ uri: item.groupImage3 }} style={[styles.imageStyle, { marginLeft: -90, zIndex: 1 }]} />
                </View>
                <Text style={styles.groupName}>{item.groupName}</Text>
                <Text style={styles.member}>{item.groupMemberCount} Members</Text>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.mainContainer}>

            <Text style={styles.myRoom}>My Rooms</Text>
            {rooms && (
                <>
                    <Text style={styles.roomCount}>You have {rooms} room</Text>
                </>
            )}

            <View style={styles.flatContainer}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.userId}
                    numColumns={NUM_COLUMNS}
                    columnWrapperStyle={styles.columnWrapperStyle}
                    contentContainerStyle={styles.contentContainerStyle}
                    renderItem={groupItemRender}
                />
            </View>

        </View>

    )
};



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    textInputStyle: {
        borderColor: Colors.lightGrey,
        borderRadius: 10,
        borderWidth: 2,
        marginBottom: 10,
        padding: 10
    },
    submitBtnStyle: {
        borderRadius: 10,
        backgroundColor: Colors.blue,
        justifyContent: 'center',
        height: 40
    },
    submitTxtStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.white,
        textAlign: 'center'
    },
    myRoom: {
        fontSize: 25,
        fontWeight: 'bold',
        marginStart: 20,
        marginTop: 20,
        color: Colors.charcoal
    },
    roomCount: {
        fontSize: 16,
        fontWeight: '600',
        marginStart: 20,
        color: Colors.charcoal
    },
    flatContainer: {
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 140
    },
    flatItem: {
        borderRadius: 10,
        elevation: 5,
        minHeight: 180,
        width: 150,
        backgroundColor: Colors.white,
        marginBottom: 10,
        marginTop: 5,
        justifyContent: 'center'
    },
    columnWrapperStyle: {
        justifyContent: 'space-between'
    },
    contentContainerStyle: {
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageStyle: {
        height: 80,
        width: 80,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: Colors.white
    },
    groupName: {
        color: Colors.charcoal,
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'center'
    },
    member: {
        color: Colors.lightGrey,
        fontSize: 13,
        fontWeight: '300',
        textAlign: 'center'
    }
});


export default Collaboration;