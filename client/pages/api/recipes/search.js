import {searchRecipes} from "../../../middleware/services/recipesService";

export default async (req, res) => {
    try {
        const response = await searchRecipes(req.body)
        return res.json(response)
    } catch (e) {
        console.error(e);
        res.json({error: e, message: 'Error in creating recipe'})
    }
}
