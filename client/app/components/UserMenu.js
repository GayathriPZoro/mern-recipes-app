'use client'
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import { useTheme } from "@mui/material";
import { useState } from "react";
import {signOut} from "next-auth/react";
import Link from 'next/link'
import menuConfigs from "../config/menu.configs";
import {useCookies} from "react-cookie";
import Avatar from "@mui/material/Avatar";
import {useRouter} from "next/router";
import {useAppContext} from "../context/appState";
import Stack from "@mui/material/Stack";
import {textEllipsis} from "./styles.common";

const UserMenu = () => {
    const {setAppState} = useAppContext()
    const [cookies, _, removeCookie] = useCookies(['user'])
    const router = useRouter()
    const theme = useTheme();
    const user = cookies?.user && typeof cookies?.user !== 'string' ? cookies?.user : null

    const [anchorEl, setAnchorEl] = useState(null);

    const toggleMenu = (e) => setAnchorEl(e.currentTarget);
    const logout = () =>{
        setAppState('login')
        removeCookie("access_token")
        removeCookie("user")
        window.localStorage.removeItem("userID")
        signOut().then((data)=>{
            window.localStorage.removeItem("userID")
            removeCookie("user")
            router.push("/")
        })
    }
    return (
        <>
            {user && (
                <>
                    <Typography
                        variant="h6"
                        sx={{ cursor: "pointer", userSelect: "none" }}
                        onClick={toggleMenu}
                    >
                        {user?.name ? (
                            <Avatar
                                alt={user?.name}
                                src={user?.image}
                                sx={{ width: 30, height: 30}}
                            />
                        ) : (
                            <Avatar children={`${user?.name || (user?.username &&user?.username[0].toUpperCase())}`} sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText}}/>
                        )
                        }
                    </Typography>
                    <Menu
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        PaperProps={{ sx: { padding: 0 } }}
                    >
                        <Stack direction={'column'} spacing={1} sx={{m: '2% 8%'}}>
                            <Typography variant={'subtitle2'}>Signed in as</Typography>
                            <Typography variant={'subtitle1'} sx={{color: theme.palette.primary.main, ...textEllipsis }}>{user?.email || user.username}</Typography>
                        </Stack>
                        <Divider />
                        {menuConfigs.userMenu.map((item, index) => (
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                href={item.path}
                                key={index}
                                onClick={() => setAnchorEl(null)}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText disableTypography primary={
                                    <Typography textTransform="uppercase" sx={{fontSize: '0.8rem'}}>{item.display}</Typography>
                                } />
                            </ListItemButton>
                        ))}
                        <ListItemButton
                            sx={{ borderRadius: "10px" }}
                            onClick={logout}
                        >
                            <ListItemIcon><LogoutOutlinedIcon /></ListItemIcon>
                            <ListItemText disableTypography primary={
                                <Typography textTransform="uppercase" sx={{fontSize: '0.8rem'}}>sign out</Typography>
                            } />
                        </ListItemButton>
                    </Menu>
                </>
            )}
        </>
    );
};

export default UserMenu;