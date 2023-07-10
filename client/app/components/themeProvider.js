import {ThemeProvider} from "@mui/material/styles";
import themeConfigs from "../config/theme.configs";
import {useThemeContext} from "../context/theme";
import {useGlobalLoadingContext} from "../context/globalLoading";
import {useRouter} from "next/router";
const MyThemeProvider = ({children}) => {
    const {themeMode} = useThemeContext()
    const {setGlobalLoading} = useGlobalLoadingContext()
    const router=useRouter()
    const handleRouteChange = (url, { shallow }) => {
        console.log(
            `App is changing to ${url} ${
                shallow ? 'with' : 'without'
            } shallow routing`
        )
        setGlobalLoading(true)
        return;
    };

    const handleRouteComplete = (url, { shallow }) => {
        setGlobalLoading(false)
        return;
    };

    router?.events?.on('routeChangeStart', handleRouteChange)
    router?.events?.on('routeChangeComplete', handleRouteComplete)
    return(
        <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
            {children}
        </ThemeProvider>
    )
}
export default MyThemeProvider