import { StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/Colors";

const Task = () => {
    return (
        <View style={styles.mainContainer}>
            <Text>Task</Text>
        </View>
    )
};



const styles  = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white
    }
});


export default Task;