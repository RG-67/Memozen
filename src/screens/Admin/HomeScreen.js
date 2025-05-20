import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../styles/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { todayDate } from "../../utility/Converter";
import Icon from 'react-native-vector-icons/MaterialIcons';


const WINDOW_WIDTH = Dimensions.get('window').width;
const GAP = 10;
const MARGIN = 15;
const BUTTON_WIDTH = (WINDOW_WIDTH - (GAP + MARGIN)) / 2;


const today = new Date().getDate();

const getCurrentMontheDates = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dates = [];

    for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
        const date = new Date(year, month, day);
        dates.push({
            id: day.toString(),
            month: date.toLocaleString('default', { month: 'short' }),
            day: day,
            dayShort: date.toLocaleString('default', { weekday: 'short' })
        });
    }

    return dates;
}


const HomeScreen = () => {
    const [adminDetails, setAdminDetails] = useState([]);
    const [tDate, setDate] = useState("");
    const dates = getCurrentMontheDates();
    const todayIndex = dates.findIndex(item => item.day === today);
    const flatListRef = useRef(null);
    const navigation = useNavigation();

    useEffect(() => {
        if (flatListRef.current && todayIndex !== -1) {
            setTimeout(() => {
                flatListRef.current.scrollToIndex({ index: todayIndex, animated: false, viewPosition: -0.8 });
            }, 100);
        }
    }, [dates, todayIndex]);

    const monthList = ({ item }) => {
        const isToday = item.day === today;
        // const isPastDate = item.day < today;
        return (
            <Pressable onPress={() => { }}>
                <View style={[styles.monthContainer, isToday && { backgroundColor: Colors.colorPrimary }/* , isPastDate && { backgroundColor: Colors.grey } */]}>
                    <View style={[styles.dot, isToday && { backgroundColor: Colors.white }]} />
                    {/* <Text style={[styles.monthOrDay, isToday && { color: Colors.white }]}>{item.month}</Text> */}
                    <Text style={[styles.monthOrDay, isToday && { color: Colors.white }]}>{item.dayShort}</Text>
                    <Text style={[styles.day, isToday && { color: Colors.white }]}>{item.day}</Text>
                </View>
            </Pressable>
        )
    }

    useFocusEffect(() => {
        const adminImage = async () => {
            const adDetails = await AsyncStorage.getItem('userDetails');
            setAdminDetails(JSON.parse(adDetails));
            setDate(todayDate);
        }
        adminImage();
    });

    return (
        <View style={styles.mainContainer}>
            {/* Top style */}
            <View style={styles.header}>
                <Image style={styles.imageStyle} source={{ uri: adminDetails?.userimage || 'https://cdn-icons-png.flaticon.com/512/7718/7718808.png' }} />
                <View style={styles.midText}>
                    <Text style={styles.nameText}>Hello, {adminDetails?.username}</Text>
                    <Text style={styles.dateText}>Today {tDate}</Text>
                </View>
                <View style={styles.notificationContainer}>
                    <Icon name="notifications" size={30} style={styles.notification} />
                </View>
            </View>
            {/* Banner style */}
            <View style={styles.banner}>
                <View style={{ marginStart: 10, marginVertical: 10 }}>
                    <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: 25 }}>Dailey</Text>
                    <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: 25 }}>Tasks</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', marginTop: 10, color: Colors.charcoal }}>Total Completed Task</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: Colors.charcoal }}>Total Groups</Text>
                </View>
                <Image style={styles.bannerImg} source={require('../../assets/images/assign.png')} />
            </View>
            {/* Date */}
            <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                <FlatList
                    ref={flatListRef}
                    data={dates}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                    getItemLayout={(data, index) => ({ length: 80, offset: index * (80 + 10), index })}
                    initialScrollIndex={todayIndex !== -1 ? Math.max(todayIndex - 2, 0) : 0}
                    renderItem={monthList} />
            </View>

            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, fontWeight: '800', color: Colors.charcoal, marginHorizontal: 15, marginTop: 20 }}>Activity</Text>
                <TouchableOpacity onPress={() => { }} style={{
                    justifyContent: 'center', borderRadius: 10, height: 50, marginHorizontal: 10, marginTop: 10, elevation: 5, backgroundColor: Colors.white,
                    borderWidth: 1
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: Colors.black, textAlign: 'center', textAlign: 'center', alignSelf: 'center' }}>All Groups</Text>
                        <Icon name="arrow-forward" size={30} style={{ position: 'absolute', right: 10, alignSelf: 'center' }} />
                    </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('GroupCreateScreen') }} style={{
                        justifyContent: 'center', borderRadius: 10, width: BUTTON_WIDTH, height: 150, marginTop: 10,
                        marginEnd: 5, elevation: 5, backgroundColor: Colors.white, borderWidth: 1
                    }}>
                        <View>
                            <Image source={{ uri: 'https://w7.pngwing.com/pngs/766/205/png-transparent-computer-icons-icon-design-users-group-group-icon.png' }}
                                style={{ height: 50, width: 50, alignSelf: 'center' }} />
                            <Text style={{ fontWeight: 'bold', fontSize: 15, color: Colors.black, textAlign: 'center' }}>Create Group</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('GroupTask') }} style={{
                        justifyContent: 'center', borderRadius: 10, width: BUTTON_WIDTH, height: 150, marginTop: 10,
                        marginStart: 5, elevation: 5, backgroundColor: Colors.white, borderWidth: 1
                    }}>
                        <View>
                            <Image source={{ uri: 'https://e7.pngegg.com/pngimages/185/850/png-clipart-task-computer-icons-tasks-s-angle-text-thumbnail.png' }}
                                style={{ height: 50, width: 50, alignSelf: 'center' }} />
                            <Text style={{ fontWeight: 'bold', fontSize: 15, color: Colors.black, textAlign: 'center' }}>Create Task</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

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
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginTop: 10
    },

    imageStyle: {
        height: 60,
        width: 60,
        borderRadius: 50
    },
    notificationContainer: {
        height: 40,
        width: 40,
        borderRadius: 50,
        backgroundColor: Colors.noteBg1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notification: {
        color: Colors.lightRed
    },
    midText: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameText: {
        color: Colors.black,
        fontWeight: '600',
        fontStyle: 'normal',
        fontSize: 15
    },
    dateText: {
        color: Colors.black,
        fontWeight: '400',
        fontStyle: 'normal',
        fontSize: 13
    },
    banner: {
        marginHorizontal: 10,
        borderRadius: 20,
        height: 180,
        backgroundColor: Colors.thirdColor,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bannerImg: {
        height: 120,
        width: 150,
        alignSelf: 'center',
        marginEnd: 10
    },
    monthContainer: {
        width: 50,
        height: 70,
        // justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 25,
        paddingVertical: 8,
        backgroundColor: Colors.white,
        margin: 5,
        borderWidth: 1,
        borderColor: Colors.black
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 10,
        backgroundColor: Colors.black
    },
    monthOrDay: {
        fontSize: 14,
        color: Colors.lightGrey,
        fontWeight: '400',
        marginTop: 5
    },
    day: {
        fontSize: 16,
        color: Colors.black,
        fontWeight: 'bold'
    },
})



export default HomeScreen;