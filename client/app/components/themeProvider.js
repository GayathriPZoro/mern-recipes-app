import {ThemeProvider} from "@mui/material/styles";
import themeConfigs from "../config/theme.configs";
import {useThemeContext} from "../context/theme";
const MyThemeProvider = ({children}) => {
    const {themeMode} = useThemeContext()
    return(
        <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
            {children}
        </ThemeProvider>
    )
}
export default MyThemeProvider