import RecipeReviewCard from '../../../app/components/RecipeCard'
import Grid from '@mui/material/Grid'
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import {useGetUserID} from "../../../app/hooks/useGetUserID";
import {useSavedRecipes} from "../../../app/hooks/useRecipes";

const SavedRecipes = () => {
    const userID = useGetUserID()
    const { data: savedRecipes=[], isLoading, isFetching } = useSavedRecipes({userID})
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
                <Grid item key={recipe._id+idx} xs={3}>
                    <RecipeReviewCard Recipe={recipe} fromSavedRecipes/>
                </Grid>
            ))}
        </Grid>
    )
}
export default SavedRecipes