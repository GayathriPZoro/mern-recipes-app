import { useQuery } from '@tanstack/react-query'

const fetchRecipes = async () => {
    return await fetch('/api/recipes').then(response=> response.json())
}

const fetchSavedRecipes = async ({userID, onlyIds}) => {
    const resp= await fetch('/api/recipes/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({userID, onlyIds})
    }).then(response=> response.json())
    return resp?.savedRecipes || []
}
const useRecipes = () => {
    return useQuery({
        queryKey: ['recipes'],
        queryFn: () => fetchRecipes(),
    })
}

const useSavedRecipes = ({userID}) => {
    return useQuery({
        queryKey: ['savedRecipes', userID],
        queryFn: ()=> fetchSavedRecipes({userID})
    })
}
const useSavedRecipesIds = ({userID}) => {
    return useQuery({
        queryKey: ['savedRecipes', userID, 'only-ids'],
        queryFn: ()=> fetchSavedRecipes({userID, onlyIds: true})
    })
}
export { useRecipes, useSavedRecipes, useSavedRecipesIds, fetchRecipes, fetchSavedRecipes }