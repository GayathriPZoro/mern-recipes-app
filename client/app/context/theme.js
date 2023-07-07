'use client';

import { createContext, useContext, useState } from "react";
const ThemeContext = createContext({})

export const ThemeContextProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState('dark');

    return (
        <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
            {children}
        </ThemeContext.Provider>
    )
};

export const useThemeContext = () => useContext(ThemeContext);