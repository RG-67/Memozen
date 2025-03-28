import { BackHandler, Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native"
import Colors from "../styles/Colors";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import groupModel from "../SampleModel/GroupModel";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { getGroupMembesrByGroupId } from "../redux/actions/GroupActions";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const NUM_COLUMNS = 2;
const ITEM_GAP = 15;
const WINNDOW_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (WINNDOW_WIDTH - (ITEM_GAP * (NUM_COLUMNS + 1))) / NUM_COLUMNS;


const GroupMemberScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const defaultImage = 'https://upload.wikimedia.org/wikipedia/hu/thumb/1/1d/Vegita_SSJBlue.png/250px-Vegita_SSJBlue.png';
    const defaultAdminImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz8DYA1dJX3z-DCiz6NFjCfdHXatX0OEDugw&s';
    const [data, setData] = useState([]);
    const [adminData, setAdminData] = useState({});

    useEffect(() => {
        const backAction = () => {
            if (navigation.canGoBack()) {
                setData([]);
                setTimeout(() => navigation.goBack(), 100);
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();
    }, []);


    useFocusEffect(
        useCallback(() => {
            let isMounted = true;

            const fetchGroupData = async () => {
                try {
                    const groupId = await AsyncStorage.getItem('GroupId');
                    if (!groupId) return;
                    const result = await dispatch(getGroupMembesrByGroupId(groupId));
                    if (isMounted) {
                        const membersData = result?.data?.members.filter(member => member.userId !== result?.data?.adminId).map(member => ({
                            userId: member.userId,
                            userName: member.userName,
                            userImage: member.userImage,
                            userImageId: member.userImageId
                        }))
                        setData(membersData);
                        console.log("DataData ==>", membersData);
                        setAdminData(result?.data);
                    }
                } catch (error) {
                    console.error("GroupError", error);
                }
            };

            fetchGroupData();

            return () => {
                isMounted = false;
            };
        }, [])
    );



    const renderMembers = ({ item }) => (
        <Pressable onPress={() => { navigation.navigate('ChatScreen', { userId: item.userId, userName: item.userName, userImage: item.userImage || defaultImage }) }}>
            <View style={styles.memberItemMainContainer}>
                <Image source={{ uri: item.userImage || defaultImage }} style={styles.itemImg} />
                <Text style={styles.name}>{item.userName}</Text>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.members}>Members</Text>
            <Text style={styles.owner}>Owner</Text>

            <View style={styles.memberContainer}>
                <Icon name="badge" size={20} color={Colors.blue} style={{ marginStart: 10, marginTop: 10 }} />
                <Image source={{ uri: adminData.adminImage || defaultAdminImage }} style={styles.imageStyle} />
                <Text style={styles.memberName}>{adminData.adminName}</Text>
            </View>

            <Text style={styles.memberStyle}>Members</Text>

            {data.length > 0 ? (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item?.userId?.toString()}
                    numColumns={NUM_COLUMNS}
                    columnWrapperStyle={styles.columnWrapperStyle}
                    contentContainerStyle={styles.contentContainerStyle}
                    renderItem={renderMembers}
                    ListFooterComponent={<View style={{ height: 50 }} />}
                />
            ) : null}
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    members: {
        fontSize: 25,
        fontWeight: 'bold',
        marginStart: 20,
        marginTop: 20,
        color: Colors.charcoal
    },
    owner: {
        fontSize: 18,
        fontWeight: '600',
        marginStart: 20,
        color: Colors.charcoal,
        marginTop: 10
    },
    memberContainer: {
        height: 180,
        width: 160,
        borderRadius: 5,
        elevation: 5,
        marginTop: 10,
        marginStart: 15,
        backgroundColor: Colors.white
    },
    imageStyle: {
        height: 100,
        width: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 10
    },
    memberName: {
        fontSize: 16,
        color: Colors.lightGrey,
        fontWeight: '400',
        alignSelf: 'center',
        marginTop: 5
    },
    memberStyle: {
        color: Colors.charcoal,
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
        marginStart: 15
    },
    memberItemMainContainer: {
        width: ITEM_WIDTH,
        minHeight: 180,
        borderRadius: 5,
        elevation: 5,
        backgroundColor: Colors.white,
        marginTop: 25,
        justifyContent: 'center'
    },
    columnWrapperStyle: {
        justifyContent: 'space-between'
    },
    contentContainerStyle: {
        paddingHorizontal: ITEM_GAP,
        paddingBottom: ITEM_GAP
    },
    itemImg: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center'
    },
    name: {
        fontSize: 16,
        color: Colors.lightGrey,
        fontWeight: '400',
        alignSelf: 'center',
        marginTop: 5,
        marginTop: 10
    }
});


export default GroupMemberScreen;