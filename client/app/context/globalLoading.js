'use client';

import { createContext, useContext, useState } from "react";
const GlobalLoadingContext = createContext({})

export const GlobalLoadingContextProvider = ({ children }) => {
    const [globalLoading, setGlobalLoading] = useState(false);

    return (
        <GlobalLoadingContext.Provider value={{ globalLoading, setGlobalLoading }}>
            {children}
        </GlobalLoadingContext.Provider>
    )
};

export const useGlobalLoadingContext = () => useContext(GlobalLoadingContext);