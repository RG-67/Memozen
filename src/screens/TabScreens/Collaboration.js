import { Button, Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Colors from "../../styles/Colors";
import { useEffect, useState } from "react";
import socket, { connectSocket, disconnectSocket } from "../../services/socketService";
import groupModel from "../../SampleModel/GroupModel";

const Collaboration = () => {
    const NUM_COLUMNS = 2;
    const WINNDOW_WIDTH = Dimensions.get('window').width;
    const ITEM_GAP = 2;
    const ITEM_WIDTH = (WINNDOW_WIDTH - (ITEM_GAP * (NUM_COLUMNS + 1))) / NUM_COLUMNS;

    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);


    const groupItemRender = ({item}) => (
        <View style={styles.flatItem}>
            <Image source={{uri: item.groupImage1}} style={styles.imageStyle}/>
        </View>
    )

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
    },
    flatItem: {
        borderRadius: 10,
        elevation: 5,
        minHeight: 150,
        width: 150,
        backgroundColor: Colors.white,
        marginBottom: 10,
        marginTop: 5
    },
    columnWrapperStyle: {
        justifyContent: 'space-between'
    },
    contentContainerStyle: {
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    imageStyle: {
        borderRadius: 50,
        width: 30,
        height: 30,
        borderWidth: 2,
        padding: 10,
        borderColor: Colors.white
    }
});


export default Collaboration;