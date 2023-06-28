import {useState} from "react";
import {useCookies } from "react-cookie";
import {useNavigate} from "react-router-dom";
import {AuthForm} from "../components/common/authForm";
import * as Services from "../services/services";
import {MuiSnackbar} from "../components/common/MuiSnackbar";
import {useTheme} from "@mui/material";
import {useDispatch} from "react-redux";
import {setUser} from "../redux/reducers/userState";


export const Login = () => {
    const theme = useTheme();
    const dispatch= useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({})
    const [_, setCookies]=useCookies(["access_token"])
    const navigate = useNavigate()
    const handleSubmit = async(event) => {
        event.preventDefault();
        const response = await Services.login({username, password})
        if(response.error || !response.data.token) {
            setData({
                    message: response.message || 'Login Failed!',
                    severity: 'error'
                }
            )
        } else {
            dispatch(setUser(response?.data))
            setCookies("access_token", response.data.token)
            window.localStorage.setItem("user", response.data)
            window.localStorage.setItem("userID", response.data.userID)
            navigate('/recipes')
           // navigate(0)
        }
        setOpen(true)
        setUsername('');
        setPassword('')

    }
    return (
        <>
            <AuthForm
                username={username} password={password}
                setUsername={setUsername} setPassword={setPassword}
                handleSubmit={handleSubmit}
                label={'Login'}/>
            {open && (
                <MuiSnackbar severity={data.severity} message={data.message} setOpen={setOpen} open={true}/>
            )}
        </>
    )
}
