import { NavigationContainer } from "@react-navigation/native"
import { GlobalProvider } from "./context/GlobalContext"
import MainNavigator from "./navigation/MainNavigator";
import { Provider } from "react-redux";
import store from "./redux/Store";
import { SocketProvider } from "./context/SocketContext";




const App = () => {
    return (

        <GlobalProvider>
            <Provider store={store}>
                {/* <SocketProvider> */}
                    <MainNavigator />
                {/* </SocketProvider> */}
            </Provider>
        </GlobalProvider>
    )
}

export default App;