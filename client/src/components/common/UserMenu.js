import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {ListItemButton, ListItemIcon, ListItemText, Menu, Typography, useTheme} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import menuConfigs from "../../config/menu.configs";
import {useCookies} from "react-cookie";
import Avatar from "@mui/material/Avatar";
import {setUser} from "../../redux/reducers/userState";

const UserMenu = () => {
    const { user } = useSelector((state) => state.user);
    const [cookies, setCookies] = useCookies('access_token')
    const navigate = useNavigate()
    const theme = useTheme();

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);

    const toggleMenu = (e) => setAnchorEl(e.currentTarget);
    const logout = () =>{
        dispatch(setUser(null))
        setCookies("access_token", "")
        window.localStorage.removeItem("userID")
        navigate("/")
        navigate(0)
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
                        <Avatar children={`${user.username[0].toUpperCase()}`} sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText}}/>
                    </Typography>
                    <Menu
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        PaperProps={{ sx: { padding: 0 } }}
                    >
                        {menuConfigs.userMenu.map((item, index) => (
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                key={index}
                                onClick={() => setAnchorEl(null)}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText disableTypography primary={
                                    <Typography textTransform="uppercase">{item.display}</Typography>
                                } />
                            </ListItemButton>
                        ))}
                        <ListItemButton
                            sx={{ borderRadius: "10px" }}
                            onClick={logout}
                        >
                            <ListItemIcon><LogoutOutlinedIcon /></ListItemIcon>
                            <ListItemText disableTypography primary={
                                <Typography textTransform="uppercase">sign out</Typography>
                            } />
                        </ListItemButton>
                    </Menu>
                </>
            )}
        </>
    );
};

export default UserMenu;