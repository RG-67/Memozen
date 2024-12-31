import { Button, StyleSheet, Text, View } from "react-native";



const FirstScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>First Screen</Text>
            <Button title="Go to Second Screen"/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default FirstScreen;