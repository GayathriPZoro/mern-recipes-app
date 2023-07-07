'use client'
import {useSelector} from "react-redux";
import {ThemeProvider} from "@mui/material/styles";
import themeConfigs from "../config/theme.configs";
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {useState} from "react";
const MyThemeProvider = ({children, pageProps}) => {
    const { themeMode } = useSelector((state) => state.themeMode);
    const [queryClient] = useState(()=> new QueryClient())
    return(
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
                    {children}
                </ThemeProvider>
            </Hydrate>
        </QueryClientProvider>
    )
}
export default MyThemeProvider