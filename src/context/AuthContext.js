import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react"


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLanding, setIsLanding] = useState(null);
    const [type, setType] = useState("");

    useEffect(() => {
        const checkLoginStatus = async () => {
            const userId = await AsyncStorage.getItem("userDetails");
            setIsLoggedIn(!!userId);
            if (userId !== null) {
                const userType = await JSON.parse(userId).type;
                setType(userType);
            }
            const landing = await AsyncStorage.getItem("isLanding");
            if (landing === null) {
                setIsLanding(true);
                AsyncStorage.setItem("isLanding", "false");
            } else {
                setIsLanding(false);
            }
        }

        checkLoginStatus();
    }, []);


    const userLogOut = async () => {
        await AsyncStorage.removeItem("userDetails");
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userLogOut, isLanding, type }}>
            {children}
        </AuthContext.Provider>
    );
};