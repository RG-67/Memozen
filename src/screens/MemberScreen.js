import { StyleSheet, Text, View } from "react-native"
import Colors from "../styles/Colors";



const memberScreen = () => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.members}>Members</Text>
            <Text style={styles.owner}>Owner</Text>
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
        fontSize: 16,
        fontWeight: '600',
        marginStart: 20,
        color: Colors.charcoal
    },
});


export default memberScreen;