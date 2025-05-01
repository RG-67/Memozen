import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react"


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLanding, setIsLanding] = useState(null);
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const userId = await AsyncStorage.getItem("userDetails");
                if (userId !== null) {
                    const userType = await JSON.parse(userId).type;
                    setType(userType);
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
                // setIsLoggedIn(!!userId);
                const landing = await AsyncStorage.getItem("isLanding");
                if (landing === null) {
                    setIsLanding(true);
                    await AsyncStorage.setItem("isLanding", "false");
                } else {
                    setIsLanding(false);
                }
            } catch (error) {
                console.error("Auth failed: ", error);
                setIsLoggedIn(false);
                setType("");
                setIsLanding(false);
            } finally {
                setLoading(false);
            }
        }

        checkLoginStatus();
    }, []);


    const userLogOut = async () => {
        await AsyncStorage.removeItem("userDetails");
        setIsLoggedIn(false);
        setType("");
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userLogOut, isLanding, type, loading, setType }}>
            {children}
        </AuthContext.Provider>
    );
};