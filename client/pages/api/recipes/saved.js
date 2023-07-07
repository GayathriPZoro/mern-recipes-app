import {userSavedRecipes} from "../../../middleware/services/recipesService";

export default async (req, res) => {
    try{
        const response = await userSavedRecipes(req.body)
        return res.json(response)
    } catch (e) {
        console.error(e);
        res.json({error: e})
    }
}