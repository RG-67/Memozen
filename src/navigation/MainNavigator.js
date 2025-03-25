import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstScreen from '../screens/FirstScreen';
import Login from '../screens/Login';
import Register from '../screens/Register';
import TabNavigator from './TabNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import Colors from '../styles/Colors';
import MemberScreen from '../screens/MemberScreen';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import ChatScreen from '../screens/ChatScreen';
import Profile from '../screens/Profile';
import UpdateTaskScreen from '../screens/UpdateTask';
import UpdateNote from '../screens/UpdateNote';
import GroupTaskScreen from '../screens/GroupTaskScreen';
import HomeScreen from '../screens/Admin/HomeScreen';



const Stack = createNativeStackNavigator();



const MainNavigator = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const { isLanding } = useContext(AuthContext);
    const { type } = useContext(AuthContext);

    if (isLanding === null) {
        return null;
    }

    return (
        <NavigationContainer>
            <StatusBar backgroundColor={Colors.colorPrimary} barStyle={'light-content'} />
            {isLoggedIn ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {type === "Member" ? (
                        <>
                            <Stack.Screen name='TabNavigator' component={TabNavigator} />
                            <Stack.Screen name='MemberScreen' component={MemberScreen} />
                            <Stack.Screen name='ChatScreen' component={ChatScreen} />
                            <Stack.Screen name='Profile' component={Profile} />
                            <Stack.Screen name='UpdateTaskScreen' component={UpdateTaskScreen} />
                            <Stack.Screen name='UpdateNote' component={UpdateNote} />
                            <Stack.Screen name='GroupTaskScreen' component={GroupTaskScreen} />
                        </>
                    ) : (
                        <Stack.Screen name='HomeScreen' component={HomeScreen} />
                    )}
                </Stack.Navigator>
            ) : (
                <Stack.Navigator initialRouteName={isLanding ? 'FirstScreen' : 'Login'} screenOptions={{ headerShown: false }}>
                    {isLanding && <Stack.Screen name="FirstScreen" component={FirstScreen} />}
                    <Stack.Screen name='Login' component={Login} />
                    <Stack.Screen name='Register' component={Register} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
};


export default MainNavigator;