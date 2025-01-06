import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../styles/Colors";
import F6Icon from 'react-native-vector-icons/FontAwesome6'
import MIcon from 'react-native-vector-icons/MaterialIcons';
import IOIcon from 'react-native-vector-icons/Ionicons';

const AddProject = () => {
    return (
        <View style={styles.mainContainer}>

                <View style={styles.headerStyle}>
                    <Pressable onPress={() => { }}>
                        <F6Icon name="arrow-left-long" size={25} />
                    </Pressable>
                    <Text style={styles.heading}>Add Project</Text>
                    <View>
                        <MIcon name="notifications" size={30} />
                    </View>
                </View>

                <ScrollView style={{marginBottom: 90}}>
                <Pressable onPress={() => { }}>
                    <View style={styles.firstContainer}>
                        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                            <View style={styles.iconBgStyle}>
                                <IOIcon name="briefcase" size={15} color={Colors.inProgressIcon} />
                            </View>
                            <View style={styles.secondView}>
                                <Text style={styles.topTask}>Task Group</Text>
                                <Text style={styles.bottomTask}>Work</Text>
                            </View>
                        </View>
                        <IOIcon name="caret-down-outline" size={25} />
                    </View>
                </Pressable>

                <Pressable onPress={() => { }}>
                    <View style={styles.secondContainer}>
                        <View style={{ marginStart: 5, marginVertical: 5 }}>
                            <Text style={styles.topTask}>Project Name</Text>
                            <Text style={styles.dateText}>Grocery Shopping App</Text>
                        </View>
                    </View>
                </Pressable>

                <Pressable onPress={() => { }}>
                    <View style={styles.secondContainer}>
                        <View style={{ marginStart: 5, marginVertical: 5 }}>
                            <Text style={styles.topTask}>Description</Text>
                            <Text style={styles.desText}>This application is designed for super shops. By using this application they can enlist all their products in one place and can deliver. Customers will get a one-stop solution for their daily shopping.
                            </Text>
                        </View>
                    </View>
                </Pressable>


                <Pressable onPress={() => { }}>
                    <View style={styles.firstContainer}>
                        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                            <Image source={require('../../assets/images/calendar.png')} style={{ width: 20, height: 20, alignSelf: 'center', tintColor: Colors.colorPrimary }} />
                            <View style={styles.secondView}>
                                <Text style={styles.topTask}>Start Date</Text>
                                <Text style={styles.dateText}>01 October, 2024</Text>
                            </View>
                        </View>
                        <IOIcon name="caret-down-outline" size={25} />
                    </View>
                </Pressable>

                <Pressable onPress={() => { }}>
                    <View style={styles.firstContainer}>
                        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                            <Image source={require('../../assets/images/calendar.png')} style={{ width: 20, height: 20, alignSelf: 'center', tintColor: Colors.colorPrimary }} />
                            <View style={styles.secondView}>
                                <Text style={styles.topTask}>End Date</Text>
                                <Text style={styles.dateText}>25 April, 2025</Text>
                            </View>
                        </View>
                        <IOIcon name="caret-down-outline" size={25} />
                    </View>
                </Pressable>

                <Pressable onPress={() => { }}>
                    <View style={styles.firstContainer}>
                        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                            <Image source={require('../../assets/images/grocery.png')} style={{ width: 50, height: 50, alignSelf: 'center' }} />
                            <View style={styles.secondView}>
                                <Text style={styles.topTaskGr}>Grocery</Text>
                                <Text style={styles.bottomTaskGr}>shop</Text>
                            </View>
                        </View>
                        <Pressable onPress={() => {}}>
                            <Text style={{
                                borderRadius: 10, paddingHorizontal: 15, paddingVertical: 10, backgroundColor: Colors.inProgressIconBg2,
                                color: Colors.colorPrimary, fontSize: 14, fontWeight: 'bold'
                            }}>Change Logo</Text>
                        </Pressable>
                    </View>
                </Pressable>

                <TouchableOpacity style={{borderRadius: 10, backgroundColor: Colors.colorPrimary, 
                    justifyContent: 'center', alignItems: 'center', height: 45, marginHorizontal: 10, marginTop: 20}}>
                    <Text style={{fontWeight: 'bold', fontSize: 15, color: Colors.white}}>Add Project</Text>
                </TouchableOpacity>
                </ScrollView>

            
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
    firstContainer: {
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: Colors.white,
        elevation: 4,
        marginHorizontal: 10,
        padding: 10,
        marginTop: 15,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    secondView: {
        marginStart: 10
    },
    iconBgStyle: {
        width: 30,
        height: 30,
        borderRadius: 8,
        backgroundColor: Colors.inProgressIconBg,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center'
    },
    topTask: {
        fontWeight: '500',
        color: Colors.lightGrey,
        fontSize: 12
    },
    bottomTask: {
        fontWeight: 'bold',
        color: Colors.black,
        fontSize: 16
    },
    dateText: {
        fontWeight: '500',
        color: Colors.black,
        fontSize: 16
    },
    secondContainer: {
        borderRadius: 10,
        backgroundColor: Colors.white,
        elevation: 4,
        marginHorizontal: 10,
        padding: 10,
        marginTop: 15
    },
    desText: {
        fontWeight: '600',
        color: Colors.black,
        fontSize: 13,
        marginTop: 10,
        marginBottom: 15
    },
    topTaskGr: {
        fontWeight: 'bold',
        color: Colors.grGreen,
        fontSize: 15
    },
    bottomTaskGr: {
        fontWeight: 'bold',
        color: Colors.grOrange,
        fontSize: 15
    },
});


export default AddProject;