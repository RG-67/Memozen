import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native"
import Colors from "../styles/Colors";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import groupModel from "../SampleModel/GroupModel";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getGroupMembesrByGroupId } from "../redux/actions/GroupActions";

const NUM_COLUMNS = 2;
const ITEM_GAP = 15;
const WINNDOW_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (WINNDOW_WIDTH - (ITEM_GAP * (NUM_COLUMNS + 1))) / NUM_COLUMNS;

const MemberScreen = ({ route, navigation }) => {
    const defaultImage = 'https://upload.wikimedia.org/wikipedia/hu/thumb/1/1d/Vegita_SSJBlue.png/250px-Vegita_SSJBlue.png';
    const defaultAdminImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz8DYA1dJX3z-DCiz6NFjCfdHXatX0OEDugw&s';
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [adminData, setAdminData] = useState({});

    useEffect(() => {
        const fetchGroupMembers = async () => {
            try {
                const { groupId } = route.params;
                const result = await dispatch(getGroupMembesrByGroupId(groupId));
                setAdminData(result?.data);
                setData(result?.data?.members || []);
            } catch (error) {
                console.log("GrpMemErr ==>", error);
            }
        }
        fetchGroupMembers();
    }, []);

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

            {adminData && (
                <View style={styles.memberContainer}>
                    <Icon name="badge" size={20} color={Colors.blue} style={{ marginStart: 10, marginTop: 10 }} />
                    <Image source={{ uri: adminData.adminImage || defaultAdminImage }} style={styles.imageStyle} />
                    <Text style={styles.memberName}>{adminData.adminName}</Text>
                </View>
            )}

            <Text style={styles.memberStyle}>Members</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.userId}
                numColumns={NUM_COLUMNS}
                columnWrapperStyle={styles.columnWrapperStyle}
                contentContainerStyle={styles.contentContainerStyle}
                renderItem={renderMembers}
            />
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


export default MemberScreen;