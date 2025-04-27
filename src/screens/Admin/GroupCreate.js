import { BackHandler, Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Colors from "../../styles/Colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getGroupLists } from "../../redux/actions/GroupActions";
import { getUsers } from "../../redux/actions/UserActions";
import CustomCheckBox from "../../components/CustomCheckBox";

const NUM_COLUMNS = 2;
const ITEM_GAP = 5;
const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (SCREEN_WIDTH / NUM_COLUMNS) - (ITEM_GAP * 3);


const NUM_COLUMNS2 = 3;
const ITEM_GAP2 = 10;
const TOTAL_GAP = ITEM_GAP2 * (NUM_COLUMNS2 + 1);
const ITEM_WIDTH2 = (SCREEN_WIDTH - TOTAL_GAP) / NUM_COLUMNS2;

const GroupCreateScreen = () => {
    const [groupList, setGroupList] = useState([]);
    const [memberList, setMemberList] = useState([]);
    const [layout, setLayout] = useState(false);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        const backAction = () => {
            if (navigation.canGoBack()) {
                setBackPress();
            }
            return true;
        }
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    })

    useFocusEffect(
        useCallback(() => {
            const getGroupList = async () => {
                try {
                    const result = await dispatch(getGroupLists());
                    if (result.data.length > 0) {
                        setGroupList(result.data);
                    }
                } catch (error) {
                    console.error("ErrorRes: ", error);
                }
            }
            getGroupList();
        }, [])
    );

    const getAllUsers = async () => {
        setLayout(true);
        try {
            const result = await dispatch(getUsers());
            if (result.data.length > 0) {
                setMemberList(result.data);
            }
        } catch (error) {
            console.error("GetAllUserErr: ", error);
        }
    }

    const renderGroupList = ({ item }) => {
        return (
            <View style={styles.groupCard}>
                <Image style={styles.groupImage} source={{ uri: item?.groupImage }} />
                <View style={{ flex: 1, margin: 5, padding: 5 }}>
                    <Text style={styles.groupText}>ID: {item.groupId}</Text>
                    <Text style={styles.groupText}>Name: {item.groupName}</Text>
                    <Text style={styles.groupText}>Group Lead: {item.groupLead}</Text>
                    <Text style={styles.groupText}>Total Members: {item.totalMembers}</Text>
                    <Text style={styles.groupText}>Created: {item.createdAt}</Text>
                    <Text style={styles.groupText}>Updated: {item.updatedAt}</Text>
                </View>
            </View>
        )
    }

    const renderMemberList = ({ item }) => {
        return (
            <View style={styles.userCard}>
                <Image source={{ uri: item.userimage === null ? 'https://storage.googleapis.com/pod_public/750/232853.jpg' : item.userimage }} style={styles.userImage}/>
                <CustomCheckBox/>
            </View>
        )
    }

    const setBackPress = () => {
        if (layout) return setLayout(false);
        setGroupList([]);
        setTimeout(() => {
            navigation.goBack();
        }, 100);
    }

    return (
        <View style={styles.mainContainer}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => setBackPress()}>
                    <Icon size={25} name="arrow-back" style={{ alignself: 'center' }} />
                </Pressable>
                <Text style={styles.title}>
                    {layout ? 'Create Group' : 'Group'}
                </Text>
            </View>

            {/* Body */}
            {layout == false ? (
                <>
                    <TouchableOpacity style={styles.btnStyle} onPress={() => getAllUsers()}>
                        <View style={{ flexDirection: 'row' }}>
                            <AntIcon size={25} name="addusergroup" style={{ alignself: 'center', color: Colors.orange }} />
                            <Text style={{ ...styles.textStyle, textAlign: 'center', alignSelf: 'center', color: Colors.grOrange }}>Create Group</Text>
                        </View>
                        <Icon name="arrow-forward-ios" size={25} style={{ textAlignVertical: 'center', marginEnd: 5, color: Colors.orange }} />
                    </TouchableOpacity>

                    <Text style={{ ...styles.textStyle, marginStart: 20, marginTop: 20 }}>Group List</Text>
                    <FlatList
                        data={groupList}
                        keyExtractor={(item) => item?.groupId?.toString()}
                        numColumns={NUM_COLUMNS}
                        contentContainerStyle={{ paddingHorizontal: ITEM_GAP, paddingVertical: ITEM_GAP }}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        renderItem={renderGroupList}
                    />
                </>
            ) : (
                <>
                    <View style={styles.mainContainer}>
                        <Text style={{ ...styles.textStyle, marginTop: 10, marginHorizontal: 10, backgroundColor: Colors.orange, padding: 5, color: Colors.white }}>Member List</Text>
                        {memberList.length > 0 ? (
                            <>
                                <FlatList
                                    data={memberList}
                                    numColumns={NUM_COLUMNS2}
                                    keyExtractor={(item) => item?.userid}
                                    renderItem={renderMemberList}
                                    style={{ marginTop: 5 }}
                                />
                            </>
                        ) : (
                            <>
                            </>
                        )}
                    </View>
                </>
            )}


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
    btnStyle: {
        height: 45,
        marginHorizontal: 15,
        padding: 5,
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 20,
        borderWidth: 2,
        borderColor: Colors.orange,
        elevation: 5,
        backgroundColor: Colors.white,
        justifyContent: 'space-between'
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.charcoal,
        marginStart: 10
    },
    groupCard: {
        width: ITEM_WIDTH,
        borderRadius: 15,
        minHeight: 200,
        margin: ITEM_GAP,
        elevation: 2,
        backgroundColor: Colors.white
    },
    groupImage: {
        height: 100,
        borderRadius: 10,
        backgroundColor: Colors.inProgressIconBg,
        alignSelf: 'center',
        resizeMode: 'stretch',
        marginHorizontal: 10,
        width: ITEM_WIDTH / 1.1,
        marginTop: 10
    },
    groupText: {
        fontWeight: '600',
        fontSize: 12,
        color: Colors.charcoal
    },
    userCard: {
        width: ITEM_WIDTH2,
        minHeight: 100,
        margin: ITEM_GAP2 / 2
    },
    userImage: {
        width: ITEM_WIDTH2,
        height: ITEM_WIDTH2,
        resizeMode: 'stretch',
        borderRadius: 10,
        backgroundColor: Colors.inProgressIconBg2
    }
})


export default GroupCreateScreen;