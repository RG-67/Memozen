import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstScreen from '../screens/FirstScreen';
import Login from '../screens/Login';
import Register from '../screens/Register';
import TabNavigator from './TabNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import Colors from '../styles/Colors';
import memberScreen from '../screens/MemberScreen';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from '../context/AuthContext';



const Stack = createNativeStackNavigator();



const MainNavigator = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <NavigationContainer>
            <StatusBar backgroundColor={Colors.colorPrimary} barStyle={'light-content'} />
            {isLoggedIn ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='TabNavigator' component={TabNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name='MemberScreen' component={memberScreen} />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator initialRouteName='FirstScreen' screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="FirstScreen" component={FirstScreen} />
                    <Stack.Screen name='Login' component={Login} />
                    <Stack.Screen name='Register' component={Register} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
};


export default MainNavigator;