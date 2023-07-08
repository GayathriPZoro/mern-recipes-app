'use client'
import {useState} from "react";
import AuthForm from "../../app/components/authForm";
import {MuiSnackbar} from "../../app/components/MuiSnackbar";

export async function getServerSideProps({context}) {
    const data = await fetch(`${process.env.NEXT_SERVER_BASE_URL}/api/users/getAll`).then(response=> response.json())
    return { props: { users: data} }
}

const Register = ({users}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({})

    const handleSubmit = async(event) => {
        event.preventDefault();
        const response = await fetch('/api/auth/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username, password,email
            })
        }).then((resp)=> resp.json())
        if(response.error) {
            setData({
                    message:'Registration Failed!',
                    severity: 'error'
                }
            )
        }else {
            setData({
                    message: response.message || 'Registration Successful!',
                    severity: 'success'
                }
            )
        }
        setOpen(true)
        setUsername('');
        setPassword('')
        setEmail('')
        setPhoneNumber('')
    }
    const isUserNameExists=users?.map(u=>u?.username)?.includes(username)
    const isEmailExists = users?.map(u=>u.email)?.includes(email)
    return (
        <>
            <AuthForm
                username={username} password={password}
                setUsername={setUsername} setPassword={setPassword}
                email={email} setEmail={setEmail} label={'Register'}
                phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                isUserNameExists={isUserNameExists}
                isEmailExists={isEmailExists}
                handleSubmit={handleSubmit}
            />
            {open && (
                <MuiSnackbar severity={data.severity} message={data.message} setOpen={setOpen} open={true}/>
            )}
        </>
    )
}

export default Register