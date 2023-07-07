
'use client';

import { createContext, useContext, useState } from "react";
const AppContext = createContext({})

export const AppContextProvider = ({ children }) => {
    const [appState, setAppState] = useState('login');

    return (
        <AppContext.Provider value={{ appState, setAppState }}>
            {children}
        </AppContext.Provider>
    )
};

export const useAppContext = () => useContext(AppContext);