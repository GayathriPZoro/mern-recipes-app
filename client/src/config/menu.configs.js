import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import LoginIcon from '@mui/icons-material/Login'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const main = [
    {
        display: "sign in",
        path: "/",
        icon: <LoginIcon />,
        state: "login"
    },
    {
        display: "register",
        path: "/register",
        icon: <AppRegistrationIcon />,
        state: "register"
    }
];

const user = [
    {
        display: "home",
        path: "/recipes",
        icon: <HomeOutlinedIcon />,
        state: "home"
    },
    {
        display: "create-recipe",
        path: "/create-recipe",
        icon: <AddCircleOutlineIcon />,
        state: "create-recipe"
    },
    {
        display: "search",
        path: "/search-recipes",
        icon: <SearchOutlinedIcon/>,
        state: "search"
    },
    {
        display: "favorites",
        path: "/saved-recipes",
        icon: <FavoriteBorderOutlinedIcon />,
        state: "favorite"
    },
]

const userMenu = [
    {
        display: "password update",
        path: "/password-update",
        icon: <LockResetOutlinedIcon />,
        state: "password.update"
    }
];

const menuConfigs = { main, user, userMenu };

export default menuConfigs;