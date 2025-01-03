import { NavigationContainer } from "@react-navigation/native"
import { GlobalProvider } from "./context/GlobalContext"
import MainNavigator from "./navigation/MainNavigator";




const App = () => {
    return(
        <GlobalProvider>
                <MainNavigator/>
        </GlobalProvider>
    )
}

export default App;