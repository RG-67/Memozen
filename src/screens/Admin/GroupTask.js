import { Pressable, StyleSheet, Text, View } from "react-native"
import Colors from "../../styles/Colors";
import Icon from 'react-native-vector-icons/MaterialIcons';



const GroupTask = () => {
    return (
        <View style={styles.mainContainer}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => { }}>
                    <Icon size={25} name="arrow-back" style={{ alignself: 'center' }} />
                </Pressable>
                <Text style={styles.title}>
                    Group Taks
                </Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    header: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 10

    },
    title: {
        fontWeight: '800',
        fontSize: 18,
        color: Colors.black,
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1
    },
});


export default GroupTask;