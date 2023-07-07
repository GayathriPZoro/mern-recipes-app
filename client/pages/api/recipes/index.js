import dbConnect from "../../../middleware/dbConnect";
import RecipesModel from '../../../middleware/models/Recipes'
export default async (req, res) => {
    try {
        await dbConnect();
        const recipes = await RecipesModel.find({})
        res.json(recipes);
    } catch (e) {
        console.error(e);
        res.json({error: e})
    }
};