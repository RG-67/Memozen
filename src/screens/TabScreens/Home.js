import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../styles/Colors";
import Icon from 'react-native-vector-icons/MaterialIcons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CircularProgressBar from "../../components/CircularProgressbar";
import ProgressItem from "../../SampleModel/InProgressData";
import InProgressIcon from 'react-native-vector-icons/FontAwesome6'
import LinearProgressBar from "../../components/LinearProgressBar";



const inProgressRenderItem = ({ item }) => (
    <Pressable onPress={() => { }}>
        <View style={{ backgroundColor: item.color, ...styles.inProgressItemContainer }}>
            <View style={{ flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: Colors.lightGrey, fontSize: 14, fontWeight: '500' }}>{item.type}</Text>
                <View style={{ width: 25, height: 25, backgroundColor: Colors.lightestPurple, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                    <InProgressIcon name={item.imageName} size={12} style={{ alignSelf: 'center' , color: Colors.white}} />
                </View>
            </View>
            <Text style={{fontSize: 18, fontWeight: '600', color: Colors.black, marginHorizontal: 10}}>{item.description}</Text>
            <View style={{marginHorizontal: 10}}>
            <LinearProgressBar percentage={item.progress}/>
            </View>
        </View>
    </Pressable>
);

const Home = () => {
    return (
        <View style={styles.mainContainer}>

            <View style={styles.headerStyle}>
                <Pressable onPress={() => { }}>
                    <Image source={require('../../assets/images/person.png')} style={styles.prImage} />
                </Pressable>
                <View style={styles.textContainer}>
                    <Text style={styles.HelloText}>Hello!</Text>
                    <Text style={styles.nameText}>Rittik Ghosh</Text>
                </View>
                <View style={styles.notificationContainer}>
                    <Icon name="notifications" size={30} style={styles.notification} />
                </View>
            </View>

            <View style={styles.cardContainer}>
                <View style={{ justifyContent: 'space-between' }}>
                    <Text style={styles.textStyle}>Your today's task{"\n"}almost done!</Text>
                    <TouchableOpacity style={styles.viewTaskBtnStyle}>
                        <Text style={styles.taskText}>View Task</Text>
                    </TouchableOpacity>
                </View>
                <CircularProgressBar percentage={85} />
                <Pressable style={styles.threeDotContainer}>
                    <MIcon name="dots-horizontal" size={20} color={Colors.white} />
                </Pressable>
            </View>

            <View style={styles.inProgressStyle}>
                <Text style={styles.inProgress} ellipsizeMode="tail" numberOfLines={1}>In Progress</Text>
                <Text style={styles.progressText}>6</Text>
            </View>

            <FlatList
                data={ProgressItem}
                horizontal={true}
                keyExtractor={(item) => item.id}
                renderItem={inProgressRenderItem}
                ItemSeparatorComponent={() => <View style={styles.inProgressSeparator} />}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    headerStyle: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 10,
        justifyContent: 'space-between'
    },

    prImage: {
        height: 60,
        width: 60,
        borderRadius: 50,
        backgroundColor: Colors.thirdColor
    },
    textContainer: {
        marginLeft: 10,
        justifyContent: 'center',
        flex: 1
    },
    HelloText: {
        fontSize: 15,
        color: Colors.black,
        fontWeight: 'medium',
        letterSpacing: 0.2
    },
    nameText: {
        fontSize: 18,
        color: Colors.black,
        fontWeight: 'bold',
    },
    notificationContainer: {

    },
    notification: {


    },
    cardContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        borderRadius: 20,
        backgroundColor: Colors.colorPrimary,
        minHeight: 150,
        top: 10
    },
    textStyle: {
        fontSize: 15,
        fontWeight: '600',
        top: 20,
        left: 20,
        color: Colors.white
    },
    viewTaskBtnStyle: {
        width: 100,
        height: 40,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        left: 20,
        bottom: 20,
        borderRadius: 15
    },
    taskText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: Colors.colorPrimary
    },
    threeDotContainer: {
        width: 30,
        height: 25,
        backgroundColor: Colors.lightestPurple,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        top: 20,
        right: 15,
        alignContent: 'center'
    },
    threeDotText: {
        fontWeight: 'bold',
        color: Colors.white,
        alignSelf: 'center'
    },
    inProgressStyle: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 20
    },
    inProgress: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    progressText: {
        left: 5,
        borderRadius: 30,
        fontSize: 10,
        backgroundColor: Colors.transPurple,
        color: Colors.lightPurple,
        alignSelf: 'center',
        alignContent: 'center',
        textAlign: 'center',
        verticalAlign: 'middle',
        width: 18,
        height: 18,
        fontWeight: 'bold',
        top: 2
    },
    inProgressItemContainer: {
        width: 220,
        height: 150,
        borderRadius: 15,
        start: 10,
        top: 10,
        justifyContent: 'space-evenly'
    },
    inProgressSeparator: {
        width: 15
    }
});

export default Home;