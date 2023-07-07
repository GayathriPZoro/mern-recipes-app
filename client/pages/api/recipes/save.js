import {saveRecipe} from "../../../middleware/services/recipesService";

export default async (req, res) => {
    try{
        const response = await saveRecipe(req.body)
        return res.json(response)
    } catch (e) {
        console.error(e);
        res.json({error: e})
    }
}