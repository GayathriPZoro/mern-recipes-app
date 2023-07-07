'use client'
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { AppBar, Box, Button, IconButton, Stack, Toolbar, useScrollTrigger } from "@mui/material";
import { cloneElement, useState } from "react";
import Link from 'next/link'
import menuConfigs from "../config/menu.configs";
import { themeModes } from "../config/theme.configs";
import Logo from "./Logo";
import Sidebar from "./Sidebar";
import UserMenu from "./UserMenu";
import {useThemeContext} from "../context/theme";
import {useAppContext} from "../context/appState";
import {useCookies} from "react-cookie";

const ScrollAppBar = ({ children, window }) => {
    const { themeMode } = useThemeContext()

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 50,
        target: typeof window !== 'undefined' ? window() : undefined
    });

    return cloneElement(children, {
        sx: {
            color: trigger ? "text.primary" : themeMode === themeModes.dark ? "primary.contrastText" : "text.primary",
            backgroundColor: "background.paper"
        }
    });
};
const TopNavbar = () => {
    const[cookies, setCookies] = useCookies(['user'])
    const user = cookies?.user && typeof cookies?.user !== 'string' ? cookies?.user : null
    const {appState, setAppState} = useAppContext()
    const { themeMode, setThemeMode } = useThemeContext()
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const mainMenuConfigs = user ? menuConfigs.user : menuConfigs.main

    const onSwithTheme = () => {
        const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
        setThemeMode(theme)
    };

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <>
            <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
            <ScrollAppBar>
                <AppBar elevation={1} sx={{ zIndex: 9999 }}>
                    <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <IconButton
                                color="inherit"
                                sx={{ mr: 2, display: { md: "none" } }}
                                onClick={toggleSidebar}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
                                <Logo />
                            </Box>
                        </Stack>

                        {/* main menu */}
                        <Box flexGrow={1} alignItems="center" display={{ xs: "none", md: "flex" }}>
                            <Box sx={{ marginRight: "30px" }}>
                                <Logo />
                            </Box>
                            {mainMenuConfigs?.map((item, index) => (
                                <Button
                                    key={index}
                                    sx={{
                                        color: appState.includes(item.state) ? "primary.contrastText" : "inherit",
                                        mr: 2
                                    }}
                                    component={Link}
                                    href={item.path}
                                    onClick={()=> {
                                        setAppState(item.state)}
                                    }
                                    variant={appState.includes(item.state) ? "contained" : "text"}
                                >
                                    {item.display}
                                </Button>
                            ))}
                            <IconButton
                                sx={{ color: "inherit" }}
                                onClick={onSwithTheme}
                            >
                                {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
                                {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
                            </IconButton>
                        </Box>
                        {/* main menu */}

                        {/* user menu */}
                        {user && <UserMenu />}
                        {/* user menu */}
                    </Toolbar>
                </AppBar>
            </ScrollAppBar>
        </>
    );
};

export default TopNavbar;