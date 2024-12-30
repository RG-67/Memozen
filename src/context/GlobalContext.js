import { Children, createContext } from "react";



export const GlobalContext = createContext();

export const GlobalProvider = ({Children}) => {
    return (
        <GlobalContext.Provider value={{}}>
            {Children}
        </GlobalContext.Provider>
    )
}