import dbConnect from "../../../middleware/dbConnect";
import UserModel from '../../../middleware/models/Users'
export default async (req, res) => {
    try {
        await dbConnect();
        const user = req.body.userID ? await UserModel.find({_id: userID}) : await UserModel.find({email: req.body.email})
        res.json(user[0]);
    } catch (e) {
        console.error(e);
        res.json({error: e})
    }
};