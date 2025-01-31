import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Colors from "../styles/Colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const ChatScreen = ({ route }) => {

    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        setUserDetails(route.params);
    }, [route.params]);



    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <View style={styles.userHeader}>
                <Icon size={30} name="keyboard-backspace" style={{alignSelf: 'center', color: Colors.white}}/>
                <Image source={{uri: userDetails?.userImage}} style={styles.userImage}/>
                <Text style={styles.headerText}>{userDetails?.userName}</Text>
                </View>
                <Icon size={30} name="dots-vertical" style={{alignSelf: 'center', color: Colors.white}}/>
            </View>

            <View style={{flex: 1}}>
                <Text>Messages</Text>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10}}>
                <TextInput
                keyboardType="default"
                placeholder="Message....."
                style={styles.chatTextBox}
                multiline={true}
                />
                <TouchableOpacity style={styles.sendBtn}>
                    <Icon size={30} name="send" style={{color: Colors.white, alignSelf: 'center'}}/>
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
    headerText : {
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
    }
});


export default ChatScreen;