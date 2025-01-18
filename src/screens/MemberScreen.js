import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native"
import Colors from "../styles/Colors";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import groupModel from "../SampleModel/GroupModel";

const NUM_COLUMNS = 2;
const ITEM_GAP = 15;
const WINNDOW_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (WINNDOW_WIDTH - (ITEM_GAP * (NUM_COLUMNS + 1))) / NUM_COLUMNS;

const memberScreen = () => {

    const renderMembers = ({ item }) => (
        <Pressable onPress={() => { }}>
            <View style={styles.memberItemMainContainer}>
                <Image source={{ uri: item.groupImage3 }} style={styles.itemImg} />
                <Text style={styles.name}>{item.groupName}</Text>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.members}>Members</Text>
            <Text style={styles.owner}>Owner</Text>

            <View style={styles.memberContainer}>
                <Icon name="badge" size={20} color={Colors.blue} style={{ marginStart: 10, marginTop: 10 }} />
                <Image source={{ uri: 'https://storage.googleapis.com/pod_public/750/232853.jpg' }} style={styles.imageStyle} />
                <Text style={styles.memberName}>Goku</Text>
            </View>

            <Text style={styles.memberStyle}>Members</Text>
            <FlatList
                data={groupModel}
                keyExtractor={(item) => item.id}
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


export default memberScreen;