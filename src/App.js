import { NavigationContainer } from "@react-navigation/native"
import { GlobalProvider } from "./context/GlobalContext"
import MainNavigator from "./navigation/MainNavigator";
import { Provider } from "react-redux";
import store from "./redux/Store";
import { SocketProvider } from "./context/SocketContext";
import { AuthProvider } from "./context/AuthContext";
import GlobalLoader from "./components/GlobalLoader";




const App = () => {
    return (

        // <AuthProvider>
        //     <GlobalProvider>
        //         <Provider store={store}>
        //             {/* <SocketProvider> */}
        //             <MainNavigator />
        //             <GlobalLoader />
        //             {/* </SocketProvider> */}
        //         </Provider>
        //     </GlobalProvider>
        // </AuthProvider>

        <Provider store={store}>
            <AuthProvider>
                <GlobalProvider>
                    <SocketProvider>
                        <MainNavigator />
                    </SocketProvider>
                    <GlobalLoader />
                </GlobalProvider>
            </AuthProvider>
        </Provider>
    )
}

export default App;