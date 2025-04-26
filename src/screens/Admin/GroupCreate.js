import { Dimensions, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Colors from "../../styles/Colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getGroupLists } from "../../redux/actions/GroupActions";

const NUM_COLUMNS = 2;
const ITEM_GAP = 5;
const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (SCREEN_WIDTH / NUM_COLUMNS) - (ITEM_GAP * 3);

const GroupCreateScreen = () => {
    const [groupList, setGroupList] = useState([]);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    useFocusEffect(
        useCallback(() => {
            const getGroupList = async () => {
                try {
                    const result = await dispatch(getGroupLists());
                    if (result.data.length > 0) {
                        setGroupList(result.data);
                        console.log("hjksdh", result.data);
                    }
                } catch (error) {
                    console.error("ErrorRes: ", error);
                }
            }
            getGroupList();
        }, [])
    );

    const renderGroupList = () => {
        return (
            <View style={styles.groupCard}>
                <Text>Text</Text>
            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Icon size={25} name="arrow-back" style={{ alignself: 'center' }} />
                </Pressable>
                <Text style={styles.title}>Create Group</Text>
            </View>

            {/* Body */}
            <TouchableOpacity style={styles.btnStyle}>
                <View style={{ flexDirection: 'row' }}>
                    <AntIcon size={25} name="addusergroup" style={{ alignself: 'center', color: Colors.orange }} />
                    <Text style={{ ...styles.textStyle, textAlign: 'center', alignSelf: 'center', }}>Select Member</Text>
                </View>
                <Icon name="arrow-forward-ios" size={25} style={{ textAlignVertical: 'center', marginEnd: 5 }} />
            </TouchableOpacity>

            <Text style={{ ...styles.textStyle, marginStart: 20, marginTop: 20 }}>Group List</Text>
            <FlatList
                data={groupList}
                keyExtractor={(item) => item?.groupId?.toString()}
                numColumns={NUM_COLUMNS}
                contentContainerStyle={{ paddingHorizontal: ITEM_GAP, paddingVertical: ITEM_GAP }}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                renderItem={renderGroupList}
            />


        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
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
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.black,
        minHeight: 100,
        margin: ITEM_GAP
    }
})


export default GroupCreateScreen;