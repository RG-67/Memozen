import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react"


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const userId = await AsyncStorage.getItem("userDetails");
            setIsLoggedIn(!!userId);
        }

        checkLoginStatus();
    }, []);


    const userLogOut = async () => {
        await AsyncStorage.removeItem("userDetails");
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userLogOut }}>
            {children}
        </AuthContext.Provider>
    );
};