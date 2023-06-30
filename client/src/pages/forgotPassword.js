import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {containerStyle} from "../components/common/styles.common";
import {Button, TextField, useTheme} from "@mui/material";
import {useState} from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as Services from "../services/services";
import {setUser} from "../redux/reducers/userState";
import {MuiSnackbar} from "../components/common/MuiSnackbar";


export const ForgotPassword = () => {
    const theme = useTheme();
    const [username, setUsername] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({})
    const handleSubmit = () => {
        console.log('--confirm clicked')
        const handleSubmit = async(event) => {
            event.preventDefault();
            const response = await Services.updatePassword({username, password})
            if(response.error) {
                setData({
                        message: response.message || 'Password Update Failed!',
                        severity: 'error'
                    }
                )
            } else {
            }
            setOpen(true)
            setPassword('')
            setConfirmPassword('')
        }
    }
    return (
        <Stack direction={'column'} spacing={4} m={'auto'} sx={{...containerStyle, minWidth: 300, maxWidth: 600}}>
            <Typography variant={'h5'} style={{ color: theme.palette.primary.main, textAlign: 'center' }}>Update Password</Typography>
            <Stack direction='column' spacing={2}>
                <TextField label={'User Name'} required
                           helperText={!username ? 'Required': null}
                           variant={'outlined'} value={username} onChange={(e)=> setUsername(e.target.value)}/>
                <TextField label={'New Password'} required value={password} onChange={(e)=> setPassword(e.target.value)}
                           type={showPassword ? 'text': 'password'}
                           InputProps={{endAdornment: !showPassword ? <Visibility onClick={()=>setShowPassword(true)}/> : <VisibilityOff onClick={()=>setShowPassword(false)}/>}}
                           helperText={!password ?  'Required' : 'Do not share your password to anyone'}
                           variant={'outlined'}/>
                <TextField label={'Confirm Password'} required value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}
                           type={showPassword ? 'text': 'password'}
                           InputProps={{endAdornment: !showPassword ? <Visibility onClick={()=>setShowPassword(true)}/> : <VisibilityOff onClick={()=>setShowPassword(false)}/>}}
                           helperText={!confirmPassword ?  'Required' : (password !== confirmPassword) ? 'Confirm password and new password are not matched': null}
                           variant={'outlined'}/>
                <Button variant="contained" onClick={handleSubmit}
                        sx={{borderRadius: '10px'}}
                        disabled={!password || !confirmPassword || (password !== confirmPassword)}>Submit</Button>
            </Stack>
            {open && (
                <MuiSnackbar severity={data.severity} message={data.message} setOpen={setOpen} open={true}/>
            )}
        </Stack>
    )
}
