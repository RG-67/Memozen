import { StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/Colors";

const Home = () => {
    return (
        <View style={styles.mainContainer}>
            <Text>Home</Text>
        </View>
    )
}

const styles  = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white
    }
});

export default Home;