import axios from 'axios'
export default async function (req, res) {
    try{
        if(req?.body?.emailId){
            const data = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_EMAIL_API_KEY}&email=${req?.body?.emailId}`)
                .then(response => {
                    console.log(response?.data);
                    return response?.data
                })
                .catch(error => {
                    console.log(error);
                });
            res.send(data)
        } else{
            res.send({message: 'emailId is not present in the request body'})
        }
    }catch (e) {
        res.status(500).send({error: e.message})
    }
}