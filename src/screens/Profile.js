import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/Feather';
import Colors from "../styles/Colors";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";



const Profile = () => {
    const navigation = useNavigation();
    const [userDetails, setUserDetails] = useState([]);
    const { userLogOut } = useContext(AuthContext);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const userDt = await AsyncStorage.getItem('userDetails');
            setUserDetails(JSON.parse(userDt));
        }
        fetchUserDetails();
    }, []);

    const showAlert = () => {
        Alert.alert("Alert!", "You want to Log Out?", [
            {
                text: "No",
                onPress: () => { },
                style: "cancel"
            },
            {
                text: "Yes",
                onPress: () => { logOut(); },
                style: "default"
            }
        ]);
    }

    const logOut = () => {
        // AsyncStorage.clear();
        userLogOut();
    }

    return (
        <View style={styles.mainContainer}>
            <View style={{ flexDirection: 'row', marginHorizontal: 15, marginTop: 10 }}>
                <Pressable onPress={() => { navigation.goBack() }}><Icon size={25} name="arrow-back" style={styles.iconStyle} /></Pressable>
                <Text style={styles.textStyle}>Profile</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginStart: 20, marginTop: 20 }}>
                <Image style={styles.imageStyle} source={{ uri: userDetails?.userimage || 'https://storage.googleapis.com/pod_public/750/232853.jpg' }} />
                <Icon name="edit" size={18} style={styles.editIconStyle} />
            </View>
            <Text style={styles.nameStyle}>{userDetails?.username || 'Name'}</Text>

            <View style={{ marginTop: 30, flex: 1 }}>
                <Pressable onPress={() => { }} style={{ marginHorizontal: 20, height: 60, borderRadius: 20, backgroundColor: Colors.white, flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <FIcon name="user" size={20} style={{ alignSelf: 'center', marginStart: 10, color: Colors.lightGrey }} />
                        <Text style={{ alignSelf: 'center', marginStart: 10, fontSize: 15, color: Colors.lightGrey, fontWeight: '600' }}>{userDetails?.username || 'Name'}</Text>
                    </View>
                    <FIcon name="edit" size={20} style={styles.editIcon} />
                </Pressable>

                <Pressable onPress={() => { }} style={styles.cardContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <MIcon name="email-variant" size={20} style={{ alignSelf: 'center', marginStart: 10, color: Colors.lightGrey }} />
                        <Text style={{ alignSelf: 'center', marginStart: 10, fontSize: 15, color: Colors.lightGrey, fontWeight: '600' }}>{userDetails?.email || 'Email'}</Text>
                    </View>
                    <FIcon name="edit" size={20} style={styles.editIcon} />
                </Pressable>

                <Pressable onPress={() => { }} style={styles.cardContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <FIcon name="phone" size={20} style={{ alignSelf: 'center', marginStart: 10, color: Colors.lightGrey }} />
                        <Text style={{ alignSelf: 'center', marginStart: 10, fontSize: 15, color: Colors.lightGrey, fontWeight: '600' }}>+91 {userDetails?.phone || 'Phone'}</Text>
                    </View>
                    <FIcon name="edit" size={20} style={styles.editIcon} />
                </Pressable>

                <Pressable onPress={() => { }} style={styles.cardContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon name="support-agent" size={20} style={{ alignSelf: 'center', marginStart: 10, color: Colors.lightGrey }} />
                        <Text style={{ alignSelf: 'center', marginStart: 10, fontSize: 15, color: Colors.lightGrey, fontWeight: '600' }}>Support</Text>
                    </View>
                    <Icon name="arrow-forward-ios" size={20} style={styles.editIcon} />
                </Pressable>

                <Pressable onPress={() => { showAlert() }} style={styles.cardContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon name="logout" size={20} style={{ alignSelf: 'center', marginStart: 10, color: Colors.lightGrey }} />
                        <Text style={{ alignSelf: 'center', marginStart: 10, fontSize: 15, color: Colors.lightGrey, fontWeight: '600' }}>Log Out</Text>
                    </View>
                </Pressable>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    iconStyle: {
        padding: 4,
        borderRadius: 5,
        backgroundColor: Colors.white,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        color: Colors.black,
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1,
        marginEnd: 30
    },
    imageStyle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: Colors.yellow,
        borderWidth: 3,
        alignSelf: 'center'
    },
    editIconStyle: {
        padding: 2,
        borderRadius: 50,
        backgroundColor: Colors.white,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: Colors.yellow,
        transform: [{
            translateX: -38,
        },
        {
            translateY: 40
        }
        ]
    },
    nameStyle: {
        color: Colors.black,
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    cardContainer: {
        marginHorizontal: 20,
        height: 60,
        borderRadius: 20,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        marginTop: 20
    },
    editIcon: {
        position: 'absolute',
        right: 10,
        alignSelf: 'center',
        color: Colors.lightGrey
    }
})


export default Profile;