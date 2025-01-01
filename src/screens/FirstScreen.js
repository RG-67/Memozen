import { Button, Image, StyleSheet, Text, View } from "react-native";



const FirstScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/get_start_image.webp')} style={styles.imageStyle}/>
            <Text style={styles.text}>First Screen</Text>
            <Button title="Go to Second Screen" />
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
    },
    imageStyle: {
        width: '100%',
        // height: 100
    }
});

export default FirstScreen;