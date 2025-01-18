import { Image, StyleSheet, Text, View } from "react-native"
import Colors from "../styles/Colors";
import Icon from 'react-native-vector-icons/SimpleLineIcons';



const memberScreen = () => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.members}>Members</Text>
            <Text style={styles.owner}>Owner</Text>

            <View style={styles.memberContainer}>
                <Icon name="badge" size={20} color={Colors.blue} style={{marginStart: 10, marginTop: 10}}/>
                <Image source={{uri: 'https://storage.googleapis.com/pod_public/750/232853.jpg'}} style={styles.imageStyle}/>
                <Text style={styles.memberName}>Goku</Text>
            </View>
        </View>

    )
}



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    members: {
        fontSize: 25,
        fontWeight: 'bold',
        marginStart: 20,
        marginTop: 20,
        color: Colors.charcoal
    },
    owner: {
        fontSize: 18,
        fontWeight: '600',
        marginStart: 20,
        color: Colors.charcoal,
        marginTop: 10
    },
    memberContainer: {
        height: 180,
        width: 150,
        borderRadius: 10,
        elevation: 5,
        marginTop: 10,
        marginStart: 10,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.5,
        shadowradius: 2
    },
    imageStyle: {
        height: 100,
        width: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 10
    },
    memberName: {
        fontSize: 18,
        color: Colors.lightGrey,
        fontWeight: '400',
        alignSelf: 'center',
        marginTop: 5
    }
});


export default memberScreen;