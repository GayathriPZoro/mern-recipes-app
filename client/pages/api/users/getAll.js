import dbConnect from "../../../middleware/dbConnect";
import UserModel from '../../../middleware/models/Users'
export default async (req, res) => {
    try {
        await dbConnect();
        const users = await UserModel.find({})
        res.json(users);
    } catch (e) {
        console.error(e);
        res.json({error: e})
    }
};