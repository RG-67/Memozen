import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/TabScreens/Home';
import Task from '../screens/TabScreens/Task';
import Note from '../screens/TabScreens/Note';
import Collaboration from '../screens/TabScreens/Collaboration';
import AddProject from '../screens/TabScreens/AddProject';
import Login from '../screens/Login';
import Colors from '../styles/Colors';



const Tab = createBottomTabNavigator();


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
            <Tab.Screen name='Home' component={Home}/>
            <Tab.Screen name='Task' component={Task}/>
            <Tab.Screen name='AddProject' component={AddProject}/>
            <Tab.Screen name='Note' component={Note}/>
            <Tab.Screen name='Collaboration' component={Collaboration}/>
        </Tab.Navigator>
    )
}



export default TabNavigator;