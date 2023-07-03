require('dotenv').config()
const express = require('express');
const recipesRouter = express.Router();
const RecipeModel = require('../models/Recipes')
const UserModel = require("../models/Users");
const verifyToken = require('./common')
const axios = require('axios')
const elasticSearchCloudUrl = process.env.ELASTIC_HOST_NAME

// Get all recipes
recipesRouter.get('/', async(req, res)=>{
    try{
        const response = await RecipeModel.find({})
        res.status(200).json(response)
    }catch(e) {
        res.json(e)
    }
})
// Create New Recipe
recipesRouter.post('/', verifyToken ,async(req, res)=>{
    const recipe = new RecipeModel(req.body)
    try{
        const response = await recipe.save()
        res.status(200).json(response)
    }catch(e) {
        res.json(e)
    }
})

// Update Recipe to User Recipes
recipesRouter.put('/', verifyToken, async(req, res)=>{
     try{
         const recipe = await RecipeModel.findById(req.body.recipeID)
         const user = await UserModel.findById(req.body.userID)
         user.savedRecipes.push(recipe);
         await user.save()
        res.status(200).json({savedRecipes: user.savedRecipes})
    }catch(e) {
        res.json(e)
    }
})

recipesRouter.get('/savedRecipes/ids/:userID', async(req, res)=>{
    try{
        const user = await UserModel.findById(req.params.userID);
        res.json({savedRecipes: user?.savedRecipes})
    }catch (e) {
        res.json(e)
    }
})
//Get saved recipes for given user id
recipesRouter.get('/savedRecipes/:userID', async(req, res)=>{
    try{
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({
            _id: {$in: user.savedRecipes}
        })
        res.json({ savedRecipes })
    }catch (e) {
        res.json(e)
    }
})

//Search Recipes
recipesRouter.post('/searchRecipes', async(req, res)=>{
    try{
        const payload = {
            "query": {
                "multi_match": {
                    "query": req.body.searchTerm,
                    "type":   "phrase_prefix",
                    "fields": ["name","instructions", "ingredients"]
                }
            }
        }
        const headers = {
            'Authorization': `apiKey ${process.env.ELASTIC_SEARCH_APP_API_KEY}`,
        }
        const {data} = await axios.post(`${elasticSearchCloudUrl}/my-recipes-elastic-search-app/_search`,payload, {headers})
        res.send({recipes: data?.hits?.hits?.map(r=>r?._source) || [], total: data?._shards?.total || 0})
    }catch (e) {
        console.log('--Search Recipes Error--', e)
        res.json(e)
    }
})
module.exports=recipesRouter;