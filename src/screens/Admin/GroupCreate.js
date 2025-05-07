import { Alert, BackHandler, Button, Dimensions, FlatList, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Colors from "../../styles/Colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createMemberGroup, getGroupLists } from "../../redux/actions/GroupActions";
import { getUsers } from "../../redux/actions/UserActions";
import CustomCheckBox from "../../components/CustomCheckBox";
import MComIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomRadioButton from "../../components/CustomRadioButton";
import { checkGroupValidation } from "../../hooks/GroupValidation";
import { launchImageLibrary } from "react-native-image-picker";

const NUM_COLUMNS = 2;
const ITEM_GAP = 5;
const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (SCREEN_WIDTH / NUM_COLUMNS) - (ITEM_GAP * 3);


const NUM_COLUMNS2 = 3;
const ITEM_GAP2 = 10;
const TOTAL_GAP = ITEM_GAP2 * (NUM_COLUMNS2 + 1);
const ITEM_WIDTH2 = (SCREEN_WIDTH - TOTAL_GAP) / NUM_COLUMNS2;

const NUM_COLUMNS3 = 5;
const ITEM_GAP3 = 5;
const TOTAL_GAP2 = ITEM_GAP3 * (NUM_COLUMNS3 + 1);
const ITEM_WIDTH3 = (SCREEN_WIDTH - TOTAL_GAP2) / NUM_COLUMNS3;

const GroupCreateScreen = () => {
    const [groupList, setGroupList] = useState([]);
    const [memberList, setMemberList] = useState([]);
    const [layout, setLayout] = useState(false);
    const [form, setForm] = useState(false);
    const [userId, selectedUserId] = useState([]);
    const [userList, setUserList] = useState([]);
    const [radioSelectedUserId, setradioSelectedUserId] = useState(null);
    const [groupImage, setGroupImage] = useState(null);
    const [groupName, setGroupName] = useState("");

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
    }, [])

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
                const users = result.data.map(user => ({
                    ...user,
                    totalGroup: user.groups ? user.groups.length : 0
                }));
                setMemberList(users);
            }
        } catch (error) {
            console.error("GetAllUserErr: ", error);
        }
    }

    const toggleUserSelection = (item) => {
        selectedUserId(prevSelectedUserId => {
            if (prevSelectedUserId.includes(item.userid)) {
                setUserList((prvUser) => prvUser.filter(u => u.userid !== item.userid));
                return prevSelectedUserId.filter(id => id !== item.userid);
            } else {
                setUserList((prvUser) => [
                    ...prvUser,
                    {
                        userid: item.userid,
                        userimage: item.userimage,
                        username: item.username
                    }
                ]);
                return [...prevSelectedUserId, item.userid];
            }
        });
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
        const isChecked = userId.includes(item.userid);
        return (
            <View style={styles.userCard}>
                <Image source={{ uri: item.userimage === null ? 'https://storage.googleapis.com/pod_public/750/232853.jpg' : item.userimage }} style={styles.userImage} />
                <CustomCheckBox
                    checked={isChecked}
                    onToggle={() => toggleUserSelection(item)}
                />
                <View style={{ position: 'absolute', bottom: 1, backgroundColor: Colors.charcoal, padding: 2, borderRadius: 5, start: 0, end: 0 }}>
                    <Text style={{ color: Colors.white, fontSize: 12, fontWeight: '500' }}>{item.userid}</Text>
                    <Text style={{ color: Colors.white, fontSize: 12, fontWeight: '400' }}>{item.username}</Text>
                    <Text style={{ color: Colors.white, fontSize: 12, fontWeight: '400' }}>Total Group: {item.totalGroup}</Text>
                </View>
            </View>
        )
    }

    const renderSelectedUser = ({ item }) => {
        const selectedId = item.userid === radioSelectedUserId;
        return (
            <View style={styles.memberCard}>
                <Image source={{ uri: item.userimage === null ? 'https://storage.googleapis.com/pod_public/750/232853.jpg' : item.userimage }} style={styles.userListImage} />
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: Colors.charcoal }}>{item.userid}</Text>
                <Text style={{ fontSize: 10, fontWeight: '500', color: Colors.charcoal }}>{item.username}</Text>
                {/* RadioButton */}
                <TouchableOpacity onPress={() => setradioSelectedUserId(item.userid)} style={styles.radioBtn}>
                    <View style={{ backgroundColor: selectedId ? Colors.blue : Colors.white, width: 15, height: 15, borderRadius: 50 }} />
                </TouchableOpacity>
            </View>
        )
    }

    const setFormView = () => {
        Alert.alert("Save Members", "Are you sure to save members?", [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Done',
                style: 'default',
                onPress: () => saveMemberList()
            }
        ])
    }

    const saveMemberList = () => {
        if (userList.length < 2) {
            ToastAndroid.show("Select at least two member", ToastAndroid.SHORT);
        } else {
            setForm(true);
        }
    }



    const setBackPress = () => {
        if (layout) {
            setForm(false);
            setLayout(false);
        } else {
            setGroupList([]);
            setTimeout(() => {
                navigation.goBack();
            }, 100);
        }
    }


    const pickImage = async () => {
        const options = { mediaType: 'photo', selectionLimit: 1, includeBase64: false }
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("Image error: ", response.error);
            } else {
                const uri = response.assets[0];
                setGroupImage(uri);
                console.log("Image uri: ", uri);
            }
        })
    }

    const createGroup = async () => {
        const validation = checkGroupValidation(radioSelectedUserId, groupImage, groupName);
        if (validation) {
            try {
                const result = await dispatch(createMemberGroup(radioSelectedUserId, groupName, userId, groupImage));
                if (result.status === 200) {
                    ToastAndroid.show(result?.message, ToastAndroid.SHORT);
                } else {
                    Alert.alert(result?.message, "", null);
                }
                setLayout(false);
                setForm(false);
            } catch (error) {
                console.log("CreateGroupPageErr: ", error);
            }
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
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
                            {!form ? (
                                memberList.length > 0 ? (
                                    <>
                                        <Text style={{ ...styles.textStyle, marginTop: 10, marginHorizontal: 10, backgroundColor: Colors.orange, padding: 5, color: Colors.white }}>Member List</Text>
                                        <FlatList
                                            data={memberList}
                                            numColumns={NUM_COLUMNS2}
                                            keyExtractor={(item) => item?.userid}
                                            renderItem={renderMemberList}
                                            style={{ marginTop: 5 }}
                                        />
                                        <TouchableOpacity style={{ marginHorizontal: 10, marginBottom: 10, backgroundColor: Colors.blue, height: 40, justifyContent: 'center', alignItems: 'center' }}
                                            onPress={() => setFormView()}>
                                            <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 15 }}>Save</Text>
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <>
                                        <View style={{ ...styles.mainContainer, justifyContent: 'center' }}>
                                            <Text style={{ ...styles.textStyle, alignSelf: 'center' }}>Member Not Found!</Text>
                                        </View>
                                    </>
                                )
                            ) : (
                                <>
                                    <View style={styles.mainContainer}>
                                        <Text style={{ ...styles.lavelText, marginHorizontal: 10, marginTop: 10, backgroundColor: Colors.orange, padding: 5 }}>{userList.length} Member Selected</Text>
                                        <Text style={{ marginTop: 5, marginHorizontal: 10, color: Colors.black, fontWeight: 'bold', fontSize: 16 }}>Select Group Lead -</Text>
                                        <FlatList
                                            data={userList}
                                            keyExtractor={(item) => item.userid}
                                            numColumns={5}
                                            renderItem={renderSelectedUser}
                                            style={{ marginTop: 10, maxHeight: 180 }}
                                        />
                                        <Text style={{ marginTop: 5, marginHorizontal: 10, color: Colors.black, fontWeight: 'bold', fontSize: 16 }}>Select Group Image -</Text>
                                        <TouchableOpacity style={{
                                            marginHorizontal: 10, marginTop: 5, marginBottom: 10, borderRadius: 10, backgroundColor: Colors.noteBgHeader1,
                                            height: 180, justifyContent: 'center', alignItems: 'center', overflow: 'hidden'
                                        }}
                                            onPress={pickImage}>
                                            {groupImage ? (
                                                <>
                                                    <Image style={{ borderRadius: 10, height: 180, width: "100%", resizeMode: 'stretch' }}
                                                        source={{ uri: groupImage.uri }}
                                                        // resizeMode="cover"
                                                    />
                                                    <MComIcon name="file-image-plus-outline" size={100} style={{ textAlign: 'center', color: Colors.white, position: 'absolute' }} />
                                                </>
                                            ) : (
                                                <>
                                                    <MComIcon name="file-image-plus-outline" size={100} style={{ textAlign: 'center', color: Colors.noteBg1, alignSelf: 'center' }} />
                                                </>
                                            )}
                                        </TouchableOpacity>
                                        <TextInput
                                            placeholder="Enter group name"
                                            keyboardType="default"
                                            multiline={false}
                                            value={groupName}
                                            onChangeText={setGroupName}
                                            style={{ marginHorizontal: 10, borderWidth: 1, borderRadius: 5, height: 40, padding: 5 }}
                                        />
                                        <TouchableOpacity style={{ backgroundColor: Colors.blue, height: 40, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 10, start: 10, end: 10 }}
                                            onPress={() => createGroup()}
                                        >
                                            <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 15 }}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </View>
                    </>
                )
                }


            </View >
        </KeyboardAvoidingView>
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
        minHeight: ITEM_WIDTH2,
        resizeMode: 'stretch',
        borderRadius: 10,
        backgroundColor: Colors.inProgressIconBg2
    },
    lavelText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 15,
    },
    memberCard: {
        width: ITEM_WIDTH3,
        minHeight: 50,
        margin: ITEM_GAP3 / 2
    },
    userListImage: {
        width: ITEM_WIDTH3,
        minHeight: 55,
        resizeMode: 'stretch',
        borderRadius: 10,
        backgroundColor: Colors.inProgressIconBg2
    },
    radioBtn: {
        position: 'absolute',
        top: 5,
        left: 5,
        borderRadius: 50,
        width: 20,
        height: 20,
        padding: 5,
        backgroundColor: Colors.white,
        borderWidth: 1.2,
        borderColor: Colors.red,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default GroupCreateScreen;