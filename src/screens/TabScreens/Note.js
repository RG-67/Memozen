import { StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/Colors";

const Note = () => {
    return (
        <View style={styles.mainContainer}>
            <Text>Note</Text>
        </View>
    )
};



const styles  = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white
    }
});


export default Note;