import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Colors from "../../styles/Colors";
import { useState } from "react";

const Collaboration = () => {

    const [message, setMessage] = useState('');


    const sendMsg = () => {
        
    }

    return (
        <View style={styles.mainContainer}>
            <TextInput
                style={styles.textInputStyle}
                placeholder="Enter message"
                value={message}
                keyboardType='default'
                onChangeText={setMessage} />

            <TouchableOpacity style={styles.submitBtnStyle}>
                <Text style={styles.submitTxtStyle}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
};



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    textInputStyle: {
        width: 250,
        height: 40,
        borderColor: Colors.lightGrey,
        borderRadius: 10,
        borderWidth: 2,
        alignSelf: 'center',
        marginTop: 20
    },
    submitBtnStyle: {
        width: 250,
        height: 40,
        backgroundColor: Colors.colorPrimary,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
        justifyContent: 'center',
    },
    submitTxtStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.white,
        textAlign: 'center'
    }
});


export default Collaboration;