import { StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/Colors";

const AddProject = () => {
    return (
        <View style={styles.mainContainer}>
            <Text>AddProject</Text>
        </View>
    )
};



const styles  = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white
    }
});


export default AddProject;