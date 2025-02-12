import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from "../styles/Colors";



const Profile = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={{ flexDirection: 'row', marginHorizontal: 15, marginTop: 10 }}>
                <Pressable onPress={() => { }}><Icon size={25} name="arrow-back" style={styles.iconStyle} /></Pressable>
                <Text style={styles.textStyle}>Profile</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Image style={styles.imageStyle} source={{ uri: 'https://storage.googleapis.com/pod_public/750/232853.jpg' }} />
                <Icon name="edit" size={18} style={styles.editIconStyle} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    iconStyle: {
        padding: 4,
        borderRadius: 5,
        backgroundColor: Colors.white,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        color: Colors.black,
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1
    },
    imageStyle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: Colors.yellow,
        borderWidth: 2,
        alignSelf: 'center',
        marginTop: 20
    },
    editIconStyle: {
        padding: 2,
        borderRadius: 50,
        backgroundColor: Colors.white,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: Colors.yellow,
        transform: [{
            translateX: -25,
        },
        {
            translateY: 40
        }
        ]
    }
})


export default Profile;