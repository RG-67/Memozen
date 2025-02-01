import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Colors from "../styles/Colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import socket, { connectSocket, disconnectSocket } from "../services/socketService";



const ChatScreen = ({ route }) => {

    const [senderId, setSenderId] = useState("");
    const [userDetails, setUserDetails] = useState({});
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");

    useEffect(() => {
        const setIds = async () => {
            try {
                const storedSenderId = await AsyncStorage.getItem('userId');
                if (storedSenderId) {
                    setUserDetails(route.params);
                    setSenderId(storedSenderId);
                    connectSocket();
                }
            } catch (error) {
                console.error("SetIdsError ==>", error);
            }
        }
        setIds();
    }, [route.params]);

    useEffect(() => {
        if (senderId !== "" && userDetails?.userId) {
            socket.emit("joinRoom", { userId: senderId });

            const handleMessage = (data) => {
                console.log("Received message: ", data);
                setMessages((prevMessage) => [...prevMessage, data]);
            };

            socket.on("chatMessage", handleMessage);

            /* socket.on("chatMessage", (data) => {
                console.log("Received message: ", data);
                setMessages((prevMessage) => [...prevMessage, data]);
            }); */

            return () => {
                socket.off("chatMessage", handleMessage);
                disconnectSocket();
            }

            /* return () => {
                disconnectSocket();
            } */
        }
    }, [senderId, userDetails]);

    /* useEffect(() => {
        const handleMessage = (data) => {
            console.log("Received message: ", data);
            setMessages((prevMessage) => [...prevMessage, data]);
        };

        socket.on("chatMessage", handleMessage);

        return () => {
            socket.off("chatMessage", handleMessage);
        }
    }, []); */


    const sendMessage = () => {
        if (messageText.trim() && senderId && userDetails?.userId) {
            const newMessage = {
                senderId: senderId,
                receiverId: userDetails.userId,
                message: messageText
            };
            socket.emit("sendMessage", newMessage);
            // setMessages((prevMessage) => [...prevMessage, newMessage]);
            setMessageText("");
        }
    };


    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <View style={styles.userHeader}>
                    <Icon size={30} name="keyboard-backspace" style={{ alignSelf: 'center', color: Colors.white }} />
                    <Image source={{ uri: userDetails?.userImage }} style={styles.userImage} />
                    <Text style={styles.headerText}>{userDetails?.userName}</Text>
                </View>
                <Icon size={30} name="dots-vertical" style={{ alignSelf: 'center', color: Colors.white }} />
            </View>

            {/* <View style={{ flex: 1 }}>
                <Text>Messages</Text>
            </View> */}

            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    const isMyMessage = String(item.sender_id) === String(senderId);
                    return (
                        <View style={[styles.messageContainer, isMyMessage ? styles.myMessage : styles.otherMessage]}>
                            <Text style={styles.messageText}>{item.message}</Text>
                        </View>
                    )
                }}
                style={{ flex: 1 }}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                <TextInput
                    keyboardType="default"
                    placeholder="Message....."
                    style={styles.chatTextBox}
                    multiline={true}
                    value={messageText}
                    onChangeText={setMessageText}
                />
                <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
                    <Icon size={30} name="send" style={{ color: Colors.white, alignSelf: 'center' }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.transPurple
    },
    header: {
        height: 65,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: Colors.colorPrimary
    },
    userImage: {
        width: 55,
        height: 55,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Colors.white,
        alignSelf: 'center',
        marginStart: 10
    },
    headerText: {
        fontSize: 16,
        color: Colors.white,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginStart: 10
    },
    userHeader: {
        flexDirection: 'row'
    },
    chatTextBox: {
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.colorSecondary,
        backgroundColor: Colors.white,
        padding: 10,
        flex: 1,
        marginEnd: 10,
        minHeight: 50
    },
    sendBtn: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: Colors.colorPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    messageContainer: {
        minWidth: "60%",
        maxWidth: "80%",
        margin: 10,
        padding: 10,
        borderRadius: 10,
    },
    myMessage: {
        alignSelf: "flex-end",
        backgroundColor: Colors.colorPrimary,
    },
    otherMessage: {
        alignSelf: "flex-start",
        backgroundColor: Colors.thirdColor,
    },
    messageText: {
        color: Colors.white
    }
});


export default ChatScreen;