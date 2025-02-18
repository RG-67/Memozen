import { useEffect, useRef, useState } from "react";
import { BackHandler, FlatList, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Colors from "../styles/Colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import socket, { connectSocket, disconnectSocket } from "../services/socketService";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import { getMessage, saveMessage } from "../database/messageServices";



const ChatScreen = ({ route }) => {
    const flatListRef = useRef(null);
    const navigation = useNavigation();
    const [senderId, setSenderId] = useState("");
    const [userDetails, setUserDetails] = useState({});
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");


    /* const goBackAction = () => {
        if (navigation.canGoBack()) {
            setMessages([]);
            setTimeout(() => navigation.goBack(), 100);
        }
        return true;
    }
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
} */

    useEffect(() => {
        const setIds = async () => {
            try {
                const storedSenderId = await AsyncStorage.getItem('userDetails');
                const senderId = JSON.parse(storedSenderId).userid;
                if (senderId) {
                    setUserDetails(route.params);
                    setSenderId(senderId);
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
            const chatId = `${senderId}_${userDetails?.userId}`;

            getMessage(chatId, storedMessages => {
                setMessages(storedMessages);
            });

            socket.emit("joinRoom", { userId: senderId });

            const handleMessage = (data) => {
                console.log("Received message: ", data);

                // setMessages((prevMessages) => [...prevMessages, data]);

                setMessages((prevMessages) => {
                    const isDuplicate = prevMessages.some(msg => msg.message === data.message && msg.sender_id === data.sender_id);
                    if(!isDuplicate) {
                        saveMessage(chatId, data.sender_id, data.receiver_id, data.message, data.sender_id, 0);
                        return [...prevMessages, data];
                    }
                    return prevMessages;
                });

                setTimeout(() => {
                    flatListRef.current?.scrollToEnd({ animated: true });
                }, 100);
            };

            socket.on("chatMessage", handleMessage);

            return () => {
                socket.off("chatMessage", handleMessage);
                disconnectSocket();
            };
        }
    }, [senderId, userDetails]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, []);

    const backAction = () => {
        if (navigation.canGoBack()) {
            setMessages([]);
            setTimeout(() => navigation.goBack(), 100);
        }
        return true;
    }

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
        const chatId = `${senderId}_${userDetails?.userId}`;
        if (messageText.trim() && senderId && userDetails?.userId) {
            const newMessage = {
                senderId: senderId,
                receiverId: userDetails.userId,
                message: messageText
            };
            socket.emit("sendMessage", newMessage);
            saveMessage(chatId, senderId, userDetails?.userId, messageText, senderId, 1);
            // setMessages((prevMessage) => [...prevMessage, newMessage]);
            setMessageText("");

            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true })
            }, 100);
        }
    };


    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <View style={styles.userHeader}>
                    <Pressable onPress={() => backAction()} style={{ alignSelf: 'center' }}>
                        <Icon size={30} name="keyboard-backspace" style={{ color: Colors.white }} />
                    </Pressable>
                    <Image source={{ uri: userDetails?.userImage }} style={styles.userImage} />
                    <Text style={styles.headerText}>{userDetails?.userName}</Text>
                </View>
                <Icon size={30} name="dots-vertical" style={{ alignSelf: 'center', color: Colors.white }} />
            </View>

            {/* <View style={{ flex: 1 }}>
                <Text>Messages</Text>
            </View> */}

            {/* <KeyboardAvoidingView */}
            {/* style={{ flex: 1 }} */}
            {/* behavior={Platform.OS === 'ios' ? "padding" : "height"} */}
            {/* keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} */}
            {/* > */}
            <FlatList
                ref={flatListRef}
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
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
                // ListFooterComponent={<View style={{ height: 20 }} />}
                style={{ flex: 1, marginBottom: 20 }}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />
            {/* </KeyboardAvoidingView> */}

            {/* <KeyboardAccessoryView alwaysVisible={true}> */}
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
            {/* </KeyboardAccessoryView> */}
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
        minWidth: "40%",
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