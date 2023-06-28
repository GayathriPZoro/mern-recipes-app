import {useEffect, useState} from "react";
import * as Services from "../services/services";
import RecipeReviewCard from '../components/RecipeCard'
import Grid from '@mui/material/Grid'
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import {useGetUserID} from "../hooks/useGetUserID";

export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const userID = useGetUserID()

    useEffect(() => {
        const fetchSavedRecipes = async() => {
            try{
                const response = await Services.getSavedRecipes(userID);
                setSavedRecipes(response.data.savedRecipes);
            }catch(err) {
                console.log('Fetch Recipes error: ', err)
            }
        }
        fetchSavedRecipes()
    }, [])

    if(savedRecipes?.length === 0) {
        return(
            <Box sx={{m: 'auto'}}>
                <Typography variant={'h6'}>No Recipes Saved as Favorites.</Typography>
            </Box>
        )
    }

    return (
        <Grid sx={{ width: '97%'}} m={'6% 2%'} container rowSpacing={3} columnSpacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
            {savedRecipes?.map((recipe, idx)=> (
                <Grid item key={recipe._id} xs={3}>
                    <RecipeReviewCard Recipe={recipe} fromSavedRecipes/>
                </Grid>
            ))}
        </Grid>
    )
}
