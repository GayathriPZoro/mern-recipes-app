import RecipesModel from '../models/Recipes'
import UserModel from '../models/Users'
import dbConnect from "../dbConnect";
import axios from "axios";

export const createRecipe = async(payload) => {
    try {
        await dbConnect()
        const recipe = new RecipesModel(payload)
        const response = await recipe.save()
        return response
    }catch (e) {
        return {error: e.message}
    }
}

//Update recipeid to userRecieps
export const saveRecipe = async({userID, recipeID}) => {
    try{
        const recipe = await RecipesModel.findById(recipeID)
        const user = await UserModel.findById(userID)
        user.savedRecipes.push(recipe);
        await user.save()
        return {savedRecipes: user.savedRecipes}
    }catch(e) {
       return {error: e}
    }
}

// Get User Saved Recipes
export const userSavedRecipes = async({userID, onlyIds = false}) => {
    try {
        const user = await UserModel.findById(userID);
        if(onlyIds) {
            return {savedRecipes: user?.savedRecipes}
        } else {
            const savedRecipes = await RecipesModel.find({
                _id: {$in: user.savedRecipes}
            })
            return { savedRecipes }
        }
    } catch (e) {
        return {error: e}
    }
}

//Search Recipes

export const searchRecipes = async({searchTerm}) => {
    try {
        const payload = {
            "query": {
                "multi_match": {
                    "query": searchTerm,
                    "type":   "phrase_prefix",
                    "fields": ["name","instructions", "ingredients"]
                }
            }
        }
        const headers = {
            'Authorization': `apiKey ${process.env.ELASTIC_SEARCH_APP_API_KEY}`,
        }
        const {data} = await axios.post(`${process.env.ELASTIC_HOST_NAME}/my-recipes-elastic-search-app/_search`,payload, {headers})
        return {recipes: data?.hits?.hits?.map(r=>r?._source) || [], total: data?._shards?.total || 0}
    }catch (e) {
        console.error(`Error fetching recipes by given searchTerm: ${searchTerm}`)
        return {error: e}
    }
}