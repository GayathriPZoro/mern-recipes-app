import Box from '@mui/material/Box'
import {CustomSearch} from '../components/common/MuiSearchBar'
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import {searchRecipes} from "../services/services";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import {setGlobalLoading} from "../redux/reducers/globalLoading";
import {useDispatch, useSelector} from "react-redux";

export const SearchRecipes = () => {
    const dispatch = useDispatch()
    const [recipes, setRecipes] = useState([]);

    const handleSearch = async(searchTerm) => {
        dispatch(setGlobalLoading(true))
        const response = await searchRecipes(searchTerm)
        if(response?.data) {
            setRecipes(response?.data)
            dispatch(setGlobalLoading(false))
        }
    }

    return (
        <Box m={'10% auto'} p={2}>
            <CustomSearch searchLabel={'Search recipes by name/instructions/ingredients...'} handleSearch={handleSearch}/>
            {recipes?.length === 0 ? (
                <Typography variant={'h6'} sx={{m: 5}}>No Recipes. Please input in search field</Typography>
            ) : (
                <Stack sx={{ width: '100%', maxWidth: '80vw', backgroundColor: 'transperent', mt: 3 }} direction={'column'} spacing={2}>
            {recipes?.map((recipe,idx)=> (
                <Card sx={{ maxWidth: '80vw' }} key={`${recipe?._id}-${idx}-${recipe?.timestamp}`}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="70"
                            image={recipe.image}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {recipe?.name}
                            </Typography>
                            <Typography variant="body" color="text.secondary">
                                Ingredients:
                                {recipe?.ingredients?.map((chip, idx)=>(
                                    <Chip label={chip} variant={'outlined'} color={'primary'} size={'small'} key={`${recipe?._id}-${chip}-${idx}-${Math.random()}`}/>
                                ))}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </Stack>
    )}
        </Box>
    )
}
