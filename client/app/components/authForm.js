'use client'
import {
    Button,
    Stack,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import {useState} from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {containerStyle} from "./styles.common";
import Link  from "next/link";
const AuthForm = ({username, password, setUsername, setPassword, label, email ,setEmail, phoneNumber, setPhoneNumber, handleSubmit, isUserNameExists, isEmailExists}) => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const isValidEmail = email?.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    const isValidPNo = phoneNumber?.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
    const dontHaveMsg = (label === 'Login') ? `Don't you have an account? ` : 'Already have an account?'

    const isNotValidForm = () => {
        return label === 'Login' ? (!username || !password)
            : (!username || !password || !isValidEmail || isEmailExists || isUserNameExists)
    }

    return (
        <Stack direction={'column'} spacing={4} m={'auto'} sx={{...containerStyle, minWidth: 300, maxWidth: 600}}>
            <Typography variant={'h5'} style={{ color: theme.palette.primary.main, textAlign: 'center' }}>{label}</Typography>
            <Stack direction='column' spacing={2} sx={{ mb: 2}}>
                <TextField label={'User Name'} required
                           error={isUserNameExists}
                           helperText={!username ? 'Required': isUserNameExists ? 'Username already exists' : null}
                           variant={'outlined'} value={username} onChange={(e)=> setUsername(e.target.value)}/>
                <TextField label={'Password'} required value={password} onChange={(e)=> setPassword(e.target.value)}
                           type={showPassword ? 'text': 'password'}
                           InputProps={{endAdornment: showPassword ? <Visibility onClick={()=>setShowPassword(false)}/> : <VisibilityOff onClick={()=>setShowPassword(true)}/>}}
                           helperText={!password ?  'Required' : label === 'Register' ? 'Do not share your password to anyone': null}
                           variant={'outlined'}/>
                {(email === '' || email )&&(
                    <>
                        <TextField label={'Email'} variant={'outlined'} value={email} required
                                   error={isEmailExists}
                                   onChange={(e)=> setEmail && setEmail(e.target.value)}
                                   helperText={!isValidEmail ? 'Invalid Email Address' : isEmailExists ? 'EamilId already registered' : null}
                        />
                        <TextField
                            value={phoneNumber}
                            fullWidth
                            label='Phone Number'
                            variant='outlined'
                            helperText={!isValidPNo ? 'Invalid Phone Number' : null}
                            onChange={(e)=>setPhoneNumber && setPhoneNumber(e.target.value)}
                        />
                    </>
                )}
                <Button variant="contained" onClick={handleSubmit}
                        sx={{borderRadius: '10px'}}
                        disabled={isNotValidForm()}>{label}</Button>

                <Typography variant={'subtitle2'} style={{ color: theme.palette.primary.main, textAlign: 'center', margin:'8% 0 5%' }}>
                    {dontHaveMsg}
                    <Button
                        sx={{
                            color: theme !== 'dark' ? "primary.contrastText" : "inherit",
                            ml: 1
                        }}
                        component={Link}
                        href={label === 'Login' ? '/register' : '/'}
                        to={label === 'Login' ? '/register' : '/'}
                        variant={theme !== 'dark' ? "contained" : "text"}
                    >
                        {label === 'Login' ? 'Sign Up' : 'Log In'}
                    </Button>
                </Typography>
            </Stack>
        </Stack>
    )
}
export default AuthForm