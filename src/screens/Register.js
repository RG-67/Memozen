import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import Colors from "../styles/Colors";
import { useState } from "react";
import { useDispatch } from "react-redux";
import RegisterValidation from "../hooks/UserValidation";
import { register } from "../redux/actions/UserActions";
import { useNavigation } from "@react-navigation/native";



const Register = () => {
    const [name, setname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { validateRegister } = RegisterValidation();
    const [errors, setError] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleRegister = () => {
        const isValid = validateRegister(name, phone, email, password);
        if (isValid) {
            setError(isValid);
        } else {
            setError('');
            registerUser();
        }
    }

    const registerUser = async () => {
        try {
            const userData = { username: name, email: email, password: password, phone: phone };
            setLoading(true);
            const result = await dispatch(register(userData));
            Alert.alert('Success', result?.message || 'Registration Successful', [{ text: 'OK' }]);
        } catch (error) {
            Alert.alert('Failed!!', error, [{ text: 'OK' }]);
            setError(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Lets Register{"\n"}Account</Text>
            <Text style={styles.text}>Hello user, you have{"\n"} a greatful journey</Text>
            <TextInput
                placeholder="Name"
                keyboardType='default'
                value={name}
                onChangeText={setname}
                style={styles.inputStyle} />
            <TextInput
                placeholder="Email"
                keyboardType='email-address'
                value={email}
                onChangeText={setEmail}
                style={styles.inputStyle} />
            <TextInput
                placeholder="Phone"
                keyboardType='phone-pad'
                maxLength={10}
                value={phone}
                onChangeText={setPhone}
                style={styles.inputStyle} />
            <TextInput
                placeholder="Password"
                keyboardType='visible-password'
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.inputStyle} />

            {errors ? <Text style={styles.errorText}>{errors}</Text> : null}

            <TouchableOpacity style={styles.registerBtnStyle} onPress={handleRegister}>
                <Text style={styles.btnTextStyle}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.registerBtnTextContainer}>
                <Text style={styles.questinText}>Already have an account ? </Text>
                <Pressable onPress={() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }]
                    })
                }}>
                    <Text style={styles.registerTextBtn}>Login</Text></Pressable>
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
    registerBtnStyle: {
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
        justifyContent: 'center',
        marginTop: 30
    },
    errorInput: {
        borderColor: Colors.red
    },
    errorText: {
        fontSize: 14,
        color: Colors.red,
        fontWeight: '400',
        marginBottom: 2,
        alignSelf: 'center'
    }
});


export default Register;