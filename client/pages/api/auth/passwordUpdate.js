import {passwordChange} from '../../../middleware/services/userService'

export default async function handler (req, res) {
    const {username, password} = req.body
    const response = await passwordChange({username, password})
    return res.json(response)
}