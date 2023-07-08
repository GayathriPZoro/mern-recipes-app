import {register} from '../../../middleware/services/userService'
import axios from "axios";
const sendConfirmationMail = async (user) => {
    try{
        const resp = await fetch(`${process.env.NEXT_SERVER_BASE_URL}/api/email/checkEmailValid`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({emailId: user?.email})
        }).then(resp=> resp.json())
        if(resp?.deliverability === 'DELIVERABLE' && resp?.is_valid_format?.value) { //email id is deliverable
            //send registration confirmation to user email id
            let payload = {
                "service_id": process.env.EMAILJS_SERVICE_ID,
                "template_id": process.env.EMAILJS_TEMPLATE_ID,
                "user_id": process.env.EMAILJS_PUBLIC_KEY,
                "accessToken": process.env.EMAILJS_PRIVATE_KEY,
                "template_params": {
                    "to_name": user?.username || user?.name,
                    "reply_to": user?.email,
                    "from_name": "My Recipes App",
                    "message": ""
                }
            };
            const {data} = await axios.post(`https://api.emailjs.com/api/v1.0/email/send?accessToken=${process.env.EMAILJS_PRIVATE_KEY}`,payload)
            console.log('----Email Confirmation Response----', data)
        }
    }catch (e) {
        console.error('Error in sending registration confirmation email: ',e?.message)
    }
}

export default async function handler (req, res) {
    const response = await register(req.body)
    if(!response?.error) {
        sendConfirmationMail(req.body)
    }
    return res.json(response)
}