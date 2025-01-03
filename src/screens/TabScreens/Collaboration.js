import { StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/Colors";

const Collaboration = () => {
    return (
        <View style={styles.mainContainer}>
            <Text>Collaboration</Text>
        </View>
    )
};



const styles  = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white
    }
});


export default Collaboration;