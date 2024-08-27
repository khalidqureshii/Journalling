import React from "react";
import { useState, useContext, createContext } from "react";
export const EntryContext = createContext();


export const EntryProvider = ({children}) => {
    const [data, setData] = useState();
    
    return (<EntryContext.Provider value={{data, setData}}>
        {children}
    </EntryContext.Provider>);
};

export const useEntryAuth = () => {
    const authContextValue = useContext(EntryContext);
    if (!authContextValue) {
      throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};

export default useEntryAuth;