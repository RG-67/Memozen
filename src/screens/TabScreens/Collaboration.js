import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Colors from "../../styles/Colors";
import { useState } from "react";

const Collaboration = () => {

    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);


    const sendMsg = () => {

    }

    return (
        <View style={styles.mainContainer}>
            <View style={{ flex: 1 }}>
                {chat.map((msg, index) => (
                    <Text key={index}>{msg.message}</Text>
                ))}
            </View>
            <TextInput
                style={styles.textInputStyle}
                placeholder="Type your message"
                value={message}
                keyboardType='default'
                onChangeText={setMessage} />

            {/* <TouchableOpacity style={styles.submitBtnStyle}>
                <Text style={styles.submitTxtStyle}>Submit</Text>
            </TouchableOpacity> */}

            <Button title="Send Message" onPress={sendMsg} />
        </View>
    )
};



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 20
    },
    textInputStyle: {
        borderColor: Colors.lightGrey,
        borderRadius: 10,
        borderWidth: 2,
        marginBottom: 10,
        padding: 10
    },
    submitBtnStyle: {

    },
    submitTxtStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.white,
        textAlign: 'center'
    }
});


export default Collaboration;