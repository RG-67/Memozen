import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/Colors";
import F6Icon from 'react-native-vector-icons/FontAwesome6'
import MIcon from 'react-native-vector-icons/MaterialIcons';

const Note = () => {
    return (
        <View style={styles.mainContainer}>

            <View style={styles.headerStyle}>
                <Pressable onPress={() => { }}>
                    <F6Icon name="arrow-left-long" size={25} />
                </Pressable>
                <Text style={styles.heading}>Today's Tasks</Text>
                <View>
                    <MIcon name="notifications" size={30} />
                </View>
            </View>

        </View>
    )
};



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    headerStyle: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.black,
        alignSelf: 'center'
    },
});


export default Note;