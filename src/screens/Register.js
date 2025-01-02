import { Image, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import Colors from "../styles/Colors";



const Register = () => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Lets Register{"\n"}Account</Text>
            <Text style={styles.text}>Hello user, you have{"\n"} a greatful journey</Text>
            <TextInput
            placeholder="Name"
            keyboardType='default'
            style={styles.inputStyle}/>
            <TextInput
            placeholder="Business name"
            keyboardType='default'
            style={styles.inputStyle}/>
            <TextInput
            placeholder="Phone"
            keyboardType='phone-pad'
            maxLength={10}
            style={styles.inputStyle}/>
            <TextInput
            placeholder="Email"
            keyboardType='email-address'
            style={styles.inputStyle}/>
            <TextInput
            placeholder="Password"
            keyboardType='visible-password'
            style={styles.inputStyle}/>
            <TouchableOpacity style={styles.registerBtnStyle}>
                <Text style={styles.btnTextStyle}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.registerBtnTextContainer}>
                <Text style={styles.questinText}>Already have an account ? </Text>
                <Pressable><Text style={styles.registerTextBtn}>Login</Text></Pressable>
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
    }
});


export default Register;