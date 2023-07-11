import dbConnect from "../../../middleware/dbConnect";
import RecipesModel from '../../../middleware/models/Recipes'
export default async (req, res) => {
    try {
        await dbConnect();
        const recipes = await RecipesModel.find({})
        recipes?.map((r)=>{
            if(typeof r?.instructions ==='string') {
                r.instructions = r?.instructions?.split('.')
            }
            return r
        })
        res.json(recipes);
    } catch (e) {
        console.error(e);
        res.json({error: e})
    }
};