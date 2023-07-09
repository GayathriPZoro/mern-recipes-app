import {register} from '../../../middleware/services/userService'
import axios from "axios";
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendConfirmationMail = async (user) => {
    try{
        const resp = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_EMAIL_API_KEY}&email=${user?.email}`)
            .then(response => {
                console.log(response?.data);
                return response?.data
            })
            .catch(error => {
                console.log(error);
            });
        if(resp?.deliverability === 'DELIVERABLE' && resp?.is_valid_format?.value) { //email id is deliverable
            //send registration confirmation to user email id

            const msg = {
                to: user?.email, // Change to your recipient
                from: 'gayathri.polubothu@gmail.com', // Change to your verified sender
                subject: 'MyRecipes Registration Confirmation',
                template_id: process.env.SENDGRID_TEMPLATE_ID,
                text: `Hello ${user?.username}`,
                html: '<strong>Thank you for registering with MyRecipes Application</strong>',
            }
          const sgMailResponse=await sgMail
                .send(msg)
                .then((resp) => {
                    console.log('Email sent with SendGrid')
                    return resp
                })
                .catch((error) => {
                    console.error(`Error sending Registration Confirmation Email with SendGrid: ${error}`)
                })
            console.log('Response for sending registration confirmation email withn send grid: ',sgMailResponse)
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