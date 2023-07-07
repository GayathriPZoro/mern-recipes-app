
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from "@mui/material";
import  Link  from "next/link";
import menuConfigs from "../config/menu.configs";
import Logo from "./Logo";
import uiConfigs from "../config/ui.configs";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {useThemeContext} from "../context/theme";
import { themeModes } from "../config/theme.configs";
import {useAppContext} from "../context/appState";
import {useUserContext} from "../context/user";

const Sidebar = ({ open, toggleSidebar }) => {
    const {user} = useUserContext()
    const {appState, setAppState} = useAppContext()
    const {themeMode, setThemeMode} = useThemeContext()
    const mainMenuConfigs = user ? menuConfigs.user : menuConfigs.main

    const sidebarWidth = uiConfigs.size.sidebarWith;

    const onSwitchTheme = () => {
        const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
        setThemeMode(theme)
    };

    const drawer = (
        <>
            <Toolbar sx={{ paddingY: "20px", color: "text.primary" }}>
                <Stack width="100%" direction="row" justifyContent="center">
                    <Logo />
                </Stack>
            </Toolbar>
            <List sx={{ paddingX: "30px" }}>
                <Typography variant="h6" marginBottom="20px">MENU</Typography>
                {mainMenuConfigs.map((item, index) => (
                    <ListItemButton
                        key={index}
                        sx={{
                            borderRadius: "10px",
                            marginY: 1,
                            backgroundColor: appState.includes(item.state) ? "primary.main" : "unset"
                        }}
                        href={item.path}
                        component={Link}
                        onClick={() => {
                            toggleSidebar(false)
                            setAppState(item.state)
                        }}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText disableTypography primary={<Typography textTransform="uppercase">
                            {item.display}
                        </Typography>} />
                    </ListItemButton>
                ))}
                {user && (<>
                    <Typography variant="h6" marginBottom="20px">PERSONAL</Typography>
                    {menuConfigs.userMenu.map((item, index) => (
                        <ListItemButton
                            key={index}
                            sx={{
                                borderRadius: "10px",
                                marginY: 1,
                                backgroundColor: appState.includes(item.state) ? "primary.main" : "unset"
                            }}
                            component={Link}
                            to={item.path}
                            onClick={() => {
                                toggleSidebar(false)
                                setAppState(item.state)
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText disableTypography primary={<Typography textTransform="uppercase">
                                {item.display}
                            </Typography>} />
                        </ListItemButton>
                    ))}
                </>)}

                <Typography variant="h6" marginBottom="20px">THEME</Typography>
                <ListItemButton onClick={onSwitchTheme}>
                    <ListItemIcon>
                        {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
                        {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
                    </ListItemIcon>
                    <ListItemText disableTypography primary={
                        <Typography textTransform="uppercase">
                            {themeMode === themeModes.dark ? "dark mode" : "light mode"}
                        </Typography>
                    } />
                </ListItemButton>
            </List>
        </>
    );

    return (
        <Drawer
            open={open}
            onClose={() => toggleSidebar(false)}
            sx={{
                "& .MuiDrawer-Paper": {
                    boxSizing: "border-box",
                    widh: sidebarWidth,
                    borderRight: "0px"
                }
            }}
        >
            {drawer}
        </Drawer>
    );
};

export default Sidebar;