import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native"
import Icon from 'react-native-vector-icons';
import Colors from "../styles/Colors";



const GroupTaskScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [where, setFrom] = useState();


    useFocusEffect(
        useCallback(() => {
            const fetchGroupTaks = async () => {
                try {
                    const { from } = route.params;
                    setFrom(from);
                } catch (error) {

                }
            }
            fetchGroupTaks();
        }, [])
    )


    return (
        <View style={styles.mainContainer}>
            <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}>
                <Pressable onPress={() => { navigation.goBack() }} style={styles.backBtn}>
                    <Icon name="arrow-back" size={25} style={{ alignSelf: 'center' }} />
                </Pressable>
                <Text style={styles.title}>Group Task</Text>
            </View>
            {where === "Home" ? (
                <>
                </>
            ) : (
                <>
                </>
            )}

        </View>
    )
}



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    backBtn: {
        padding: 5,
        borderWidth: 1,
        borderColor: Colors.charcoal,
        width: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignContent: 'center'
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


export default GroupTaskScreen;