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

    let groupId;

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                const result = await dispatch(getGroupByUser(userId));
                console.log("Result ==>", result.data[0].groupId);
                groupId = result.data[0].groupId;
            } catch (error) {
                console.error("ErrorResult ==>", error);
            }
        };
        fetchGroups();
    }, []);


    const groupItemRender = ({ item }) => (
        <Pressable onPress={() => navigation.navigate('MemberScreen', {groupId: groupId})}>
            <View style={styles.flatItem}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.groupImage1 }} style={[styles.imageStyle, { zIndex: 3 }]} />
                    <Image source={{ uri: item.groupImage2 }} style={[styles.imageStyle, { marginLeft: -90, zIndex: 2 }]} />
                    <Image source={{ uri: item.groupImage3 }} style={[styles.imageStyle, { marginLeft: -90, zIndex: 1 }]} />
                </View>
                <Text style={styles.groupName}>{item.groupName}</Text>
                <Text style={styles.member}>{item.totalGroupMember} Members</Text>
            </View>
        </Pressable>
    );

    /* useEffect(() => {
        connectSocket();

        socket.on('connect', () => {
            console.log('Connected to the socket server', socket.id);
        });

        socket.on('serverMessage', (data) => {
            console.log('Message from server:', data);
            // setChat((prevChat) => [...prevChat, {message: data.message, system: true}]);
        });    

        socket.on('chatMessage', (data) => {
            console.log('Received from server:', data);
            setChat((prevChat) => [...prevChat, {message: data.message, system: false}]);
        });

        return () => {
            socket.off('serverMessage');
            socket.off('chatMessage');
            disconnectSocket();
        }
    }, []); */


    /* const sendMsg = () => {
        if(message.trim() !== "") {
            socket.emit('sendMessage', {message});
            setMessage('');
        }
    } */

    return (
        <View style={styles.mainContainer}>
            {/* <View style={{ flex: 1 }}>
                {chat.map((msg, index) => (
                    <Text key={index} style={{color: msg.system ? Colors.lightGrey : Colors.black,
                        fontStyle: msg.system ? 'italic' : 'normal'
                    }}>{msg.message}</Text>
                ))}
            </View>
            <TextInput
                style={styles.textInputStyle}
                placeholder="Type your message"
                value={message}
                keyboardType='default'
                onChangeText={setMessage} />

            <TouchableOpacity style={styles.submitBtnStyle} onPress={sendMsg}>
                <Text style={styles.submitTxtStyle}>Send Message</Text>
            </TouchableOpacity> */}

            <Text style={styles.myRoom}>My Rooms</Text>
            <Text style={styles.roomCount}>You have 1 room</Text>

            <View style={styles.flatContainer}>
                <FlatList
                    data={groupModel}
                    keyExtractor={(item) => item.id}
                    numColumns={NUM_COLUMNS}
                    columnWrapperStyle={styles.columnWrapperStyle}
                    contentContainerStyle={styles.contentContainerStyle}
                    renderItem={groupItemRender}
                />
            </View>

            {/* <Image source={{uri: 'https://easydrawingguides.com/wp-content/uploads/2017/04/how-to-draw-goku-featured-image-1200.png'}} 
        style={{height: 80, width: 80, alignSelf: 'center', resizeMode: 'contain'}}/> */}

        </View>

    )
};



const styles = StyleSheet.create({
    /* mainContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 20,
        marginBottom: 80
    }, */
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
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center'
    },
    member: {
        color: Colors.lightGrey,
        fontSize: 14,
        fontWeight: '300',
        textAlign: 'center'
    }
});


export default Collaboration;