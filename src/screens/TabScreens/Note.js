import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/Colors";
import F6Icon from 'react-native-vector-icons/FontAwesome6'
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Notes from "../../SampleModel/NotesData";
import F5Icon from 'react-native-vector-icons/FontAwesome5';


const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_GAP = 10
const NUM_COLUMNS = 2
const ITEM_WIDTH = (SCREEN_WIDTH - ITEM_GAP * (NUM_COLUMNS + 1)) / NUM_COLUMNS; // Calculate item width

const noteRenderItem = ({item}) => (
    <Pressable onPress={() => {}}>
        <View style={{ backgroundColor: item.cardBg, ...styles.noteMainContainer}}>
            <View style={{height: 10, backgroundColor: item.cardTopBg, borderTopLeftRadius: 10, borderTopRightRadius: 10}}/>
            <Text style={styles.titleStyle}>{item.title}</Text>
            <View style={styles.noteItemContainer}>
                <F5Icon name="copy" size={20} color={item.iconColor}/>
                <Text style={styles.time}>{item.time}</Text>
            </View>
        </View>
    </Pressable>
);

const Note = () => {
    return (
        <View style={styles.mainContainer}>

            <View style={styles.headerStyle}>
                <Pressable onPress={() => { }}>
                    <F6Icon name="arrow-left-long" size={25} />
                </Pressable>
                <Text style={styles.heading}>Notes</Text>
                <View>
                    <MIcon name="notifications" size={30} />
                </View>
            </View>

            <View style={{marginTop: 10}}>
                <FlatList
                data={Notes}
                keyExtractor={(item) => item.id}
                columnWrapperStyle={styles.columnWrapper}
                numColumns={NUM_COLUMNS}
                contentContainerStyle={styles.contentContainer}
                renderItem={noteRenderItem}
                />
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
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.black,
        alignSelf: 'center'
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
    }
});


export default Note;