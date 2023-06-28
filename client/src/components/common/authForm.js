import {Button, Stack, TextField, Typography, useTheme} from "@mui/material";
import {useState} from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {containerStyle} from "./styles.common";
export const AuthForm = ({username, password, setUsername, setPassword, label, email ,setEmail, phoneNumber, setPhoneNumber, handleSubmit}) => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const isValidEmail = email?.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

    return (
        <Stack direction={'column'} spacing={4} m={'auto'} sx={{...containerStyle, minWidth: 300, maxWidth: 600}}>
            <Typography variant={'h5'} style={{ color: theme.palette.primary.main, textAlign: 'center' }}>{label}</Typography>
            <Stack direction='column' spacing={2}>
                <TextField label={'User Name'} required
                           helperText={!username ? 'Required': null}
                           variant={'outlined'} value={username} onChange={(e)=> setUsername(e.target.value)}/>
                <TextField label={'Password'} required value={password} onChange={(e)=> setPassword(e.target.value)}
                           type={showPassword ? 'text': 'password'}
                           InputProps={{endAdornment: !showPassword ? <Visibility onClick={()=>setShowPassword(true)}/> : <VisibilityOff onClick={()=>setShowPassword(false)}/>}}
                           helperText={!password ?  'Required' : label === 'Register' ? 'Do not share your password to anyone': null}
                           variant={'outlined'}/>
                {(email === '' || email )&&(
                    <>
                        <TextField label={'Email'} variant={'outlined'} value={email} required
                                   onChange={(e)=> setEmail && setEmail(e.target.value)}
                                   helperText={!isValidEmail ? 'Invalid Email Address' : null}
                        />
                        <TextField
                            value={phoneNumber}
                            fullWidth
                            label='Phone Number'
                            variant='outlined'
                            onChange={(e)=>setPhoneNumber && setPhoneNumber(e.target.value)}
                        />
                    </>
                )}
                <Button variant="contained" onClick={handleSubmit}
                        sx={{borderRadius: '10px'}}
                        disabled={!username || !password || (email ? !isValidEmail : false)}>{label}</Button>
            </Stack>
        </Stack>
    )
}
