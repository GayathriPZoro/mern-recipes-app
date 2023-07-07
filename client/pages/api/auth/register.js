import {register} from '../../../middleware/services/userService'

export default async function handler (req, res) {
    const response = await register(req.body)
    return res.json(response)
}