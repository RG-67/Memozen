import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FirstScreen from '../screens/FirstScreen';
import Login from '../screens/Login';
import Register from '../screens/Register';
import TabNavigator from './TabNavigation';
import { NavigationContainer } from '@react-navigation/native';



const Stack = createNativeStackNavigator();



const MainNavigator = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName='FirstScreen'>
            <Stack.Screen name="FirstScreen" component={FirstScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
            <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
            <Stack.Screen name='TabNavigator' component={TabNavigator} options={{headerShown: false}}/>
        </Stack.Navigator>
        </NavigationContainer>
    )
}


export default MainNavigator;