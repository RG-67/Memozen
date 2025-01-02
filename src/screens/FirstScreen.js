import { Button, Image, registerCallableModule, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FirstScreenGradient } from '../styles/GradientStyle';
import Colors from '../styles/Colors';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useState } from "react";



const FirstScreen = ({navigation}) => {

    const [isVisible, setVisible] = useState(true);

    const handleClick = (visibility) => {
        setVisible(visibility);
    }

    return (
        <>
            {isVisible ? (
                <FirstScreenGradient>
                    <View style={styles.container}>
                        <Image source={require('../assets/images/get_start_image.png')} />
                        <Text style={styles.title}>Task Management &{"\n"}To-Do List</Text>
                        <Text style={styles.text}>This productive tool is designed to help{"\n"}you better manage your task{"\n"}project-wise conveniently</Text>
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => handleClick(false)}>
                            <Text style={styles.buttonText}>Let's Start</Text>
                            <Icon name="arrow-right-long" size={25} style={styles.iconStyle} />
                        </TouchableOpacity>
                    </View>
                </FirstScreenGradient>
            ) :
                <View style={styles.secondContainer}>
                    <Image source={require('../assets/images/login_or_register.jpg')} style={styles.secondContainerImgStyle} />
                    <Text style={styles.title}>Team work all</Text>
                    <Text style={styles.text}>This productive tool is designed to help{"\n"}you better manage your task{"\n"}project-wise conveniently</Text>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.signInBtnStyle} onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.seconConTextStyle}>Sign in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.registerBtnStyle} onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.seconConTextStyle}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </>
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
        right: 20,
        position: 'absolute'
    },
    secondContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    secondContainerImgStyle: {
        width: '100%',
        height: 250
    },
    signInBtnStyle: {
        backgroundColor: Colors.black,
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150
    },
    registerBtnStyle: {
        backgroundColor: Colors.colorPrimary,
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150
    },
    seconConTextStyle: {
        fontSize: 18,
        color: Colors.white,
        fontWeight: 'medium'
    },
    btnContainer: {
        flexDirection: 'row',
        flex: 1,
        position: 'absolute',
        bottom: 50,
        justifyContent: 'center',
        width: '100%',
        marginHorizontal: 10, 
        gap: 10
    }
});

export default FirstScreen;