import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";



const HomeScreen = () => {
    const [adminDetails, setAdminDetails] = useEffect([]);

    useFocusEffect(() => {
        const adminImage = async () => {
            const adDetails = await AsyncStorage.getItem('userDetails');
            setAdminDetails(JSON.parse(adminDetails));
        }
        adminImage();
    });

    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <Image style={styles.imageStyle} source={{ uri: adminDetails?.userimage || 'https://cdn-icons-png.flaticon.com/512/4371/4371206.png' }} />
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
        justifyContent: 'space-between',
        marginHorizontal: 10
    },

    imageStyle: {
        height: 50,
        width: 50,
        borderRadius: 50
    }
})



export default HomeScreen;