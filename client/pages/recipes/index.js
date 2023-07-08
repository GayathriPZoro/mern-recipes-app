'use client'
import RecipeReviewCard from '../../app/components/RecipeCard'
import Box from '@mui/material/Box'
import Grid from "@mui/material/Grid";
import {useGetUserID} from "../../app/hooks/useGetUserID";
import {useCookies} from "react-cookie";
import {useSavedRecipesIds} from "../../app/hooks/useRecipes";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";

export async function getServerSideProps({context}) {
    const data = await fetch(`${process.env.NEXT_SERVER_BASE_URL}/api/recipes`).then(response=> response.json()) //${process.env.NEXT_SERVER_BASE_URL}/api/recipes
    return { props: { recipes: data} }
}

const RecipesHome = ({recipes, savedRecipesData}) => {
    const userID = useGetUserID()
    const {data: session} = useSession()
    const { data: savedRecipes = [], isLoadingSavedRecipes, isFetchingSavedRecipes } = useSavedRecipesIds({userID})
    const [cookies, _] = useCookies(["user"])
    const router = useRouter()
    useEffect(()=>{
        if(!session && !userID) {
            router.push('/')
        }
    },[])

    const handleSaveRecipe = async(Recipe) => {
        const response = await fetch('/api/recipes/save', {
            method: 'POST',
            body: JSON.stringify({recipeID: Recipe._id, userID}),
            headers: {
                'Content-Type': 'application/json',
                authorization: cookies.access_token
            }}).then(resp=>resp.json())
    }
    const isRecipeSaved = (id) => savedRecipes?.includes(id)
    return (
        <Box m={'6% 2%'}>
            <Grid sx={{ width: '100%'}} container rowSpacing={3} columnSpacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                {recipes?.map((recipe, idx)=> (
                    <Grid item key={recipe._id} xs={4} md={3}>
                        <RecipeReviewCard Recipe={recipe} isRecipeSaved={isRecipeSaved} handleSaveRecipe={handleSaveRecipe}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
export default RecipesHome