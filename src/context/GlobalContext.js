import { Children, createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    console.log('GlobalProvider rendered');
    const [theme, setTheme] = useState('light');

    return (
        <GlobalContext.Provider value={{theme}}>
            {children}
        </GlobalContext.Provider>
    )
}