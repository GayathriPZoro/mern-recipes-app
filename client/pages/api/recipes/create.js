import {createRecipe} from "../../../middleware/services/recipesService";

export default async (req, res) => {
    try {
        const response = await createRecipe(req.body)
        return res.json(response)
    } catch (e) {
        console.error(e);
        res.status(500).json({error: e, message: 'Error in creating recipe'})
    }
}
