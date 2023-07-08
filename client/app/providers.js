'use client'
import {ThemeContextProvider} from "./context/theme";
import MyThemeProvider from "./components/themeProvider";
import { CookiesProvider } from "react-cookie";
import {useState} from "react";
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {AppContextProvider} from "./context/appState";
import {GlobalLoadingContextProvider} from "./context/globalLoading";
const Providers = ({children, pageProps}) => {
    const [queryClient] = useState(()=> new QueryClient())
    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <CookiesProvider>
                    <GlobalLoadingContextProvider>
                        <AppContextProvider>
                            <ThemeContextProvider>
                                <MyThemeProvider>{children}</MyThemeProvider>
                            </ThemeContextProvider>
                        </AppContextProvider>
                    </GlobalLoadingContextProvider>
                </CookiesProvider>
            </Hydrate>
        </QueryClientProvider>
    )
}

export default Providers