import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {FirstScreenGradient} from '../styles/GradientStyle';
import Colors from '../styles/Colors';
import Icon from 'react-native-vector-icons/FontAwesome6';



const FirstScreen = () => {
    return (
        <FirstScreenGradient>
        <View style={styles.container}>
            <Image source={require('../assets/images/get_start_image.png')}/>
            <Text style={styles.title}>Task Management &{"\n"}To-Do List</Text>
            <Text style={styles.text}>This productive tool is designed to help{"\n"}you better manage your task{"\n"}project-wise conveniently</Text>
            <TouchableOpacity style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Let's Start</Text>
                <Icon name="arrow-right-long" size={30} style={styles.iconStyle}/>
            </TouchableOpacity>
        </View>
        </FirstScreenGradient>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonStyle: {
        borderRadius: 15,
        backgroundColor: Colors.colorPrimary,
        alignSelf: 'center',
        padding: 10,    
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        elevation: 5,
        marginTop: 10,
        height: 45,
        position: 'relative'
    },
    title: {
        fontSize: 18,
        color: Colors.black,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        letterSpacing: 0.5
    },
    text: {
        fontSize: 12,
        fontWeight: 'normal',
        color: Colors.lightGrey,
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 10
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.white,
        alignSelf: 'center'
    },
    iconStyle: {
        color: Colors.white, 
        right: 10, 
        position: 'absolute'
    }
});

export default FirstScreen;