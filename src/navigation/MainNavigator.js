import {createNativeStackNavigator} from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();



const MainNavigator = () => {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
            {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
        </Stack.Navigator>
    )
}


export default MainNavigator;