import { Image, Pressable, StyleSheet, Text, View, ViewBase } from "react-native";
import Colors from "../../styles/Colors";
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = () => {
    return (
        <View style={styles.mainContainer}>

            <View style={styles.headerStyle}>
                <Pressable onPress={() => { }}>
                    <Image source={require('../../assets/images/person.png')} style={styles.prImage} />
                </Pressable>
                <View style={styles.textContainer}>
                    <Text style={styles.HelloText}>Hello!</Text>
                    <Text style={styles.nameText}>Rittik Ghosh</Text>
                </View>
                <View style={styles.notificationContainer}>
                    <Icon name="notifications" size={30} style={styles.notification} />
                </View>
            </View>

            <View style={styles.cardContainer}>
                <View>
                    <Text style={styles.textStyle}>Your today's task{"\n"}almost done!</Text>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    headerStyle: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 10,
        justifyContent: 'space-between'
    },

    prImage: {
        height: 60,
        width: 60,
        borderRadius: 50,
        backgroundColor: Colors.thirdColor
    },
    textContainer: {
        marginLeft: 10,
        justifyContent: 'center',
        flex: 1
    },
    HelloText: {
        fontSize: 15,
        color: Colors.black,
        fontWeight: 'medium',
        letterSpacing: 0.2
    },
    nameText: {
        fontSize: 18,
        color: Colors.black,
        fontWeight: 'bold',
    },
    notificationContainer: {
        justifyContent: 'center'
    },
    notification: {


    },
    cardContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        borderRadius: 20,
        backgroundColor: Colors.colorPrimary,
        minHeight: 140,
        top: 10
    },
    textStyle: {

    }
});

export default Home;