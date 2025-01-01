import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FirstScreen from '../screens/FirstScreen';



const Stack = createNativeStackNavigator();



const MainNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='FirstScreen'>
            <Stack.Screen name="FirstScreen" component={FirstScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}


export default MainNavigator;