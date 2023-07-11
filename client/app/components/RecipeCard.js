import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';
import vegetarianRecipe from '../../public/assests/vegetarian-recipes.jpg'
import {useGetUserID} from "../hooks/useGetUserID";
import Chip from "@mui/material/Chip";
import {useState} from "react";


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard({Recipe, isRecipeSaved= ()=> {}, fromSavedRecipes, handleSaveRecipe=()=> {}}) {
    const [expanded, setExpanded] = useState(false);
    const {name, ingredients, instructions, cookingTime, userOwner, image} = Recipe
    const userID = useGetUserID()
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: '100%' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ backgroundColor: red[500] }} aria-label="recipe">
                        {userOwner}
                    </Avatar>
                }
                action={
                    <>
                        {!fromSavedRecipes && (
                            <Tooltip title={!isRecipeSaved(Recipe._id) ? 'Save Recipe' : 'Saved'} placement={'bottom'} arrow enterDelay={400} leaveDelay={200}>
                                {isRecipeSaved(Recipe._id) ?
                                    <SaveIcon color={'disabled'} /> : (
                                        <IconButton onClick={()=>handleSaveRecipe(Recipe)}>
                                            <SaveIcon />
                                        </IconButton>
                                    )}
                            </Tooltip>
                        )}
                    </>
                }
                title={name || 'Recipe Name'}
                subheader={`Cooking Time: ${cookingTime} (mins)`}
            />
            <CardMedia
                component="img"
                height="184"
                image={image || vegetarianRecipe}
                alt="Paella dish"
            />
            <CardContent>
                {ingredients?.map((chip, idx)=>(
                    <Chip label={chip} variant={'contained'} size={'small'} key={chip+idx}/>
                ))}
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" disabled>
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share" disabled>
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    {(typeof instructions === 'string' ? instructions?.split('.') : instructions)?.map((step, idx)=> (
                        <Typography paragraph key={`cooking instruction-${idx}-${step}`}>
                            {step}
                        </Typography>
                    ))}
                    {(instructions?.length === 0 ) && (<Typography paragraph>
                        {`No steps were added`}
                    </Typography>)}
                </CardContent>
            </Collapse>
        </Card>
    );
}