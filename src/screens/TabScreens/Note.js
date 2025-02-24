import { Dimensions, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../styles/Colors";
import F6Icon from 'react-native-vector-icons/FontAwesome6'
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Notes from "../../SampleModel/NotesData";
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import { useCallback, useEffect, useState } from "react";
import { getNotesByUserId } from "../../redux/actions/NoteActions";
import { useDispatch } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/SimpleLineIcons';


const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_GAP = 10
const NUM_COLUMNS = 2
const ITEM_WIDTH = (SCREEN_WIDTH - ITEM_GAP * (NUM_COLUMNS + 1)) / NUM_COLUMNS; // Calculate item width

const Note = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [notes, setNotes] = useState([]);


    useFocusEffect(
        useCallback(() => {
            const fetchNotes = async () => {
                try {
                    const result = await dispatch(getNotesByUserId());
                    const formattedData = result.data.map(note => ({
                        ...note,
                        cardTopBg: note.tag === "Important" ? Colors.noteBgHeader1 : Colors.noteBgHeader2,
                        cardBg: note.tag === "Important" ? Colors.noteBg1 : Colors.noteBg2,
                        iconColor: note.tag === "Important" ? Colors.noteBgHeader1 : Colors.noteBgHeader2,
                        title: note.title !== "" ? note.title.split(" ")[0] + "....." : note.content.split(" ")[0] + "....."
                    }));
                    setNotes(formattedData);
                } catch (error) {
                    console.error("NotesErr ==>", error);
                }
            }
            fetchNotes();
        }, [])
    );

    /* useEffect(() => {
        const fetchNotes = async () => {
            try {
                const result = await dispatch(getNotesByUserId());
                const formattedData = result.data.map(note => ({
                    ...note,
                    cardTopBg: note.tag === "Important" ? Colors.noteBgHeader1 : noteBgHeader2,
                    cardBg: note.tag === "Important" ? Colors.noteBg1 : Colors.noteBg2,
                    iconColor: note.tag === "Important" ? Colors.noteBgHeader1 : Colors.noteBgHeader2,
                    title: note.title.split(" ")[0] + "....."
                }));
                setNotes(formattedData);
            } catch (error) {
                console.error("NotesErr ==>", error);
            }
        }
        fetchNotes();
    }, []); */


    const noteRenderItem = ({ item }) => (
        <Pressable onPress={() => { navigation.navigate('UpdateNote', { from: "update", noteId: item.noteid }) }}>
            <View style={{ backgroundColor: item.cardBg, ...styles.noteMainContainer }}>
                <View style={{ height: 10, backgroundColor: item.cardTopBg, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                <Text style={styles.titleStyle}>{item.title}</Text>
                <View style={styles.noteItemContainer}>
                    <F5Icon name="copy" size={20} color={item.iconColor} />
                    <Text style={styles.time}>{item.createTime}</Text>
                </View>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.mainContainer}>

            <View style={styles.headerStyle}>
                {/* <Pressable onPress={() => { }}>
                    <F6Icon name="arrow-left-long" size={25} />
                </Pressable> */}
                {/* <View style={{ flex: 1, justifyContent: 'center'}}> */}
                <Text style={styles.heading}>Notes</Text>
                {/* </View> */}
                {/* <View>
                    <MIcon name="notifications" size={30} />
                </View> */}
                <View>
                    <TouchableOpacity style={styles.addBtnStyle} onPress={() => navigation.navigate('UpdateNote', { from: "create", noteId: "" })}>
                        <MIcon name="edit-note" size={25} style={{ color: Colors.white }} />
                        <Text style={{ fontSize: 14, fontWeight: '500', color: Colors.white }}>Add Note</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ marginTop: 20 }}>
                {notes.length > 0 ? (
                    <FlatList
                        data={notes}
                        keyExtractor={(item) => item.noteid}
                        columnWrapperStyle={styles.columnWrapper}
                        numColumns={NUM_COLUMNS}
                        contentContainerStyle={styles.contentContainer}
                        renderItem={noteRenderItem}
                    />
                ) : (
                    <View style={{ justifyContent: 'center', marginTop: 150 }}>
                        <Icon name="notebook" size={100} style={{ color: Colors.lightGrey, alignSelf: 'center' }} />
                        <Text style={{ fontWeight: '500', fontSize: 18, alignSelf: 'center', color: Colors.lightGrey, marginTop: 10 }}>No notes available</Text>
                    </View>
                )}
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
        marginTop: 10
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.black,
        alignSelf: 'center',
        textAlign: 'right',
        flex: 1,
        marginEnd: 50
    },
    noteMainContainer: {
        borderRadius: 10,
        minHeight: 120,
        width: ITEM_WIDTH,
        marginBottom: ITEM_GAP
    },
    noteItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        flex: 1,
        alignItems: 'flex-end',
        marginBottom: 15
    },
    time: {
        fontSize: 14,
        color: Colors.lightGrey,
        fontWeight: '400'
    },
    titleStyle: {
        fontSize: 16,
        color: Colors.black,
        fontWeight: 'bold',
        marginTop: 10,
        marginHorizontal: 15
    },
    columnWrapper: {
        justifyContent: 'space-between',
        // alignItems: 'stretch'
    },
    contentContainer: {
        paddingHorizontal: ITEM_GAP,
        paddingBottom: ITEM_GAP
    },
    addBtnStyle: {
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: Colors.green,
        borderRadius: 10,
        // position: 'absolute',
        // bottom: 80,
        // right: 10,
        alignItems: 'center',
        flexDirection: 'row'
    }
});


export default Note;