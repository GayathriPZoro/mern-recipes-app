import {login} from '../../../middleware/services/userService'

export default async function handler (req, res) {
    const {username, password} = req.body
    const response = await login({username, password})
    return res.json(response)
}