import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/TabScreens/Home';
import Task from '../screens/TabScreens/Task';
import Note from '../screens/TabScreens/Note';
import Collaboration from '../screens/TabScreens/Collaboration';
import AddProject from '../screens/TabScreens/AddProject';
import Colors from '../styles/Colors';
import { Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';



const Tab = createBottomTabNavigator();


const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity style={styles.customBarStyle}
        onPress={onPress}>
        {children}
    </TouchableOpacity>
);

const CusTomTabIcon = ({ children, onPress }) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.cusTomTabIconStyle}>
            <View style={styles.notch}>
                {children}
            </View>
        </View>
    </TouchableWithoutFeedback>
);


const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    borderTopRightRadius: 25,
                    borderTopLeftRadius: 25,
                    height: 60,
                    elevation: 20,
                    backgroundColor: Colors.colorSecondary
                }
            }}
            initialRouteName='Home'>
            <Tab.Screen name='Home' component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconContainer}>
                            <Image source={require('../assets/images/home.png')}
                                style={{
                                    height: 25,
                                    width: 25,
                                    tintColor: focused ? Colors.colorPrimary : Colors.thirdColor,
                                    alignSelf: 'center'
                                }}
                            />
                        </View>
                    ),
                    tabBarButton: (props) => (<CustomTabBarButton {...props} />)
                }} />
            <Tab.Screen name='Task' component={Task}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconContainer}>
                            <Image source={require('../assets/images/calendar.png')}
                                style={{
                                    height: 25,
                                    width: 25,
                                    tintColor: focused ? Colors.colorPrimary : Colors.thirdColor,
                                    alignSelf: 'center'
                                }} />
                        </View>
                    ),
                    tabBarButton: (props) => (<CustomTabBarButton {...props} />)
                }} />
            <Tab.Screen name='AddProject' component={AddProject}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image source={require('../assets/images/plus.png')}
                            style={{
                                height: 30,
                                width: 30,
                                tintColor: Colors.white
                            }} />
                    ),
                    tabBarButton: (props) => (<CusTomTabIcon {...props} />),
                }}
            />
            <Tab.Screen name='Note' component={Note}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconContainer}>
                            <Image source={require('../assets/images/notes.png')}
                                style={{
                                    height: 25,
                                    width: 25,
                                    tintColor: focused ? Colors.colorPrimary : Colors.thirdColor,
                                    alignSelf: 'center'
                                }} />
                        </View>
                    ),
                    tabBarButton: (props) => (<CustomTabBarButton {...props} />)
                }} />
            <Tab.Screen name='Collaboration' component={Collaboration}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconContainer}>
                            <Image source={require('../assets/images/users.png')}
                                style={{
                                    height: 25,
                                    width: 25,
                                    tintColor: focused ? Colors.colorPrimary : Colors.thirdColor,
                                    alignSelf: 'center'
                                }} />
                        </View>
                    ),
                    tabBarButton: (props) => (<CustomTabBarButton {...props} />)
                }} />
        </Tab.Navigator>
    )
}


const styles = StyleSheet.create({
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    customBarStyle: {
        top: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cusTomTabIconStyle: {
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 70,
    },
    notch: {
        height: 60,
        width: 60,
        borderRadius: 35,
        backgroundColor: Colors.colorPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowOffset: {
            x: 2,
            y: 0
        },  
        shadowRadius: 2,
        shadowOpacity: 5.0,
        position: 'absolute'
    }
});


export default TabNavigator;