import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Colors from "../../styles/Colors";
import { useEffect, useState } from "react";
import socket, { connectSocket, disconnectSocket } from "../../services/socketService";

const Collaboration = () => {

    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {
        connectSocket();

        socket.on('connect', () => {
            console.log('Connected to the socket server', socket.id);
        });

        socket.on('serverMessage', (data) => {
            console.log('Message from server:', data);
            setChat((prevChat) => [...prevChat, data]);
        });    

        socket.on('chatMessage', (data) => {
            console.log('Received from server:', data);
            setChat((prevChat) => [...prevChat, data]);
        });

        return () => {
            socket.off('chatMessage');
            disconnectSocket();
        }
    }, []);


    const sendMsg = () => {
        if(message !== "") {
            socket.emit('sendMessage', {message});
            setMessage('');
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={{ flex: 1 }}>
                {chat.map((msg, index) => (
                    <Text key={index} style={{color: Colors.black}}>{msg.message}</Text>
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
            </TouchableOpacity>
        </View>
    )
};



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 20,
        marginBottom: 80
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
    }
});


export default Collaboration;