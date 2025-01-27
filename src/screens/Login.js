import { Alert, Image, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import Colors from "../styles/Colors";
import { useContext, useState } from "react";
import { LoginValidation } from "../hooks/UserValidation";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/UserActions";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";




const Login = ({ navigation }) => {
    const {setIsLoggedIn} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();


    const handleLogin = () => {
        const loginValidate = LoginValidation(email, password);
        if(loginValidate) {
            setError(loginValidate);
        } else {
            setError('');
            loginUser();
        }
    }

    const loginUser = async () => {
        try {
            const userData = {email, password};
            setLoading(true);
            const result = await dispatch(login(userData));
            console.log(`LoginResult ==> ${result.message}`);
            await AsyncStorage.setItem("userId", result.data.userid);
            setIsLoggedIn(true);
            // navigation.navigate('TabNavigator');
        } catch (error) {
            console.log(`Login Error ==> ${error}`);
            Alert.alert('Failed!', error, [{text: "OK"}]);
        }
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Lets Sign you in</Text>
            <Text style={styles.text}>Welcome Back ,{"\n"}You have been missed</Text>
            <TextInput
                placeholder="Email"
                keyboardType='email-address'
                value={email}
                onChangeText={setEmail}
                style={styles.inputStyle} />
            <TextInput
                placeholder="Password"
                keyboardType='visible-password'
                value={password}
                onChangeText={setPassword}
                style={styles.inputStyle} />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Text style={styles.forgotPassStyle}>Forgot Password ?</Text>
            <TouchableOpacity style={styles.loginBtnStyle} onPress={handleLogin/* () => navigation.navigate('TabNavigator') */}>
                <Text style={styles.btnTextStyle}>Sign in</Text>
            </TouchableOpacity>
            <View style={styles.orLine}>
                <View style={styles.line} />
                <Text style={styles.or}>or</Text>
                <View style={styles.line} />
            </View>
            <View style={styles.threeImgContainer}>
                <Image source={require('../assets/images/google.png')} style={styles.iconStyle} />
                <Image source={require('../assets/images/facebook.png')} style={styles.iconStyle} />
                <Image source={require('../assets/images/apple.png')} style={styles.iconStyle} />
            </View>
            <View style={styles.registerBtnTextContainer}>
                <Text style={styles.questinText}>Don't have an account ? </Text>
                <Pressable><Text style={styles.registerTextBtn}>Register Now</Text></Pressable>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.black,
        marginTop: 50,
        marginStart: 20,
        letterSpacing: 0.2
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.black,
        letterSpacing: 0.2,
        marginTop: 10,
        marginBottom: 20,
        marginStart: 20,
    },
    inputStyle: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        width: 320,
        height: 40,
        marginBottom: 10,
        alignSelf: 'center'
    },
    forgotPassStyle: {
        fontWeight: 'bold',
        fontSize: 12,
        color: Colors.black,
        alignSelf: 'flex-end',
        marginEnd: 20,
        marginTop: 20
    },
    loginBtnStyle: {
        marginTop: 30,
        marginBottom: 10,
        backgroundColor: Colors.colorPrimary,
        height: 45,
        width: '320',
        alignSelf: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTextStyle: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 18
    },
    orLine: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 20
    },
    line: {
        width: 120,
        backgroundColor: Colors.lightGrey,
        height: 1,
        alignSelf: 'center'
    },
    or: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.black,
        alignSelf: 'center'
    },
    threeImgContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 80,
        marginTop: 10,
        marginBottom: 30
    },
    iconStyle: {
        height: 25,
        width: 25,
        marginTop: 20,
        marginBottom: 30
    },
    questinText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: Colors.lightGrey
    },
    registerTextBtn: {
        fontWeight: 'bold',
        fontSize: 15,
        color: Colors.colorPrimary
    },
    registerBtnTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    errorText: {
        fontSize: 14,
        color: Colors.red,
        fontWeight: '400',
        marginBottom: 2,
        alignSelf: 'center'
    }
});


export default Login;