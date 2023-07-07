'use client'
import {useEffect, useState} from "react";
import {useCookies } from "react-cookie";
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack';
import {useRouter} from "next/router";
import { useSession, signIn } from "next-auth/react";
import AuthForm from "../app/components/authForm";
import {MuiSnackbar} from "../app/components/MuiSnackbar";
import GoogleIcon from '@mui/icons-material/Google';
import {useAppContext} from "../app/context/appState";
import {useUserContext} from "../app/context/user";

const Login = () => {
    const { data: session } = useSession();
    const {setUser} = useUserContext()
    const {setAppState} = useAppContext();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({})
    const [cookies, setCookies]=useCookies(["access_token"])
    const[userCookie, setUserCookie] = useCookies(['user'])
    const router = useRouter()

    useEffect(()=>{
       setTimeout(()=> {
           if(session) {
               setUser(session?.user)
               setUserCookie("user", session?.user)
               setAppState('home')
               router.push('/recipes')
           }
       }, 1000)
        return(()=> clearTimeout())
    },[session])
    const handleSubmit = async(event) => {
        event.preventDefault();
        const response = await fetch('/api/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username, password
            })
        }).then((resp)=> resp.json())
        if(response?.error || !response?.token) {
            setData({
                    message: response?.message || 'Login Failed!',
                    severity: 'error'
                }
            )
        } else {
            setUser(response)
            setAppState('home')
            setCookies("access_token", response?.token)
            setUserCookie("user", response)
            window.localStorage.setItem("userID", response?.userID)
            setData({
                    message: 'Login Successful!',
                    severity: 'success'
                }
            )
            router.push('/recipes')
        }
        setOpen(true)
        setUsername('');
        setPassword('')
    }
    return (
        <Stack m={'auto'} direction={'column'} spacing={2}>
            <AuthForm
                username={username} password={password}
                setUsername={setUsername} setPassword={setPassword}
                handleSubmit={handleSubmit}
                label={'Login'}/>
            {open && (
                <MuiSnackbar severity={data.severity} message={data.message} setOpen={setOpen} open={true}/>
            )}
            <>
                <Button color={'primary'} variant={'contained'} onClick={() => signIn('google')} startIcon={<GoogleIcon/>}>Sign in with Google</Button>
            </>
        </Stack>
    )
}

export default Login