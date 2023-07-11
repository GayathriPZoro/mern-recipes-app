import dbConnect from "../../../middleware/dbConnect";
import RecipesModel from '../../../middleware/models/Recipes'
export default async (req, res) => {
    try {
        await dbConnect();
        const recipes = await RecipesModel.find({})
        const updated=recipes?.map((r)=>{
            if(r?.instructions?.length ===1) {
                r.instructions = r?.instructions[0]?.split('.')
            }
            return r
        })
        res.json(updated);
    } catch (e) {
        console.error(e);
        res.json({error: e})
    }
};