'use client'
import {ThemeContextProvider, useThemeContext} from "./context/theme";
import MyThemeProvider from "./components/themeProvider";
import {useState} from "react";
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {AppContextProvider} from "./context/appState";
import {UserContextProvider} from "./context/user";
import {GlobalLoadingContextProvider} from "./context/globalLoading";
const Providers = ({children, pageProps}) => {
    const [queryClient] = useState(()=> new QueryClient())
    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <GlobalLoadingContextProvider>
                    <UserContextProvider>
                        <AppContextProvider>
                            <ThemeContextProvider>
                                <MyThemeProvider>{children}</MyThemeProvider>
                            </ThemeContextProvider>
                        </AppContextProvider>
                    </UserContextProvider>
                </GlobalLoadingContextProvider>
            </Hydrate>
        </QueryClientProvider>
    )
}

export default Providers