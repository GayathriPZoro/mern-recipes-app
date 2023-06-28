import {Home} from "../pages/home";
import {Login} from "../pages/login";
import {Register} from "../pages/register";
import {CreateRecipe} from "../pages/createRecipe";
import {SavedRecipes} from "../pages/savedRecipes";

export const routesGen = {
    login: "/",
    register: "/register",
    home: "/recipes",
    createRecipe: "/create-recipe",
    savedRecipes: "/saved-recipes",
    passwordUpdate: "/password-update"
};

const routes = [
    {
        index: true,
        element: <Login />,
        state: "login"
    },
    {
        path: "/recipes",
        element: <Home />,
        state: "home"
    },
    {
        path: "/register",
        element: <Register />,
        state: "register"
    },
    {
        path: "/create-recipe",
        element: <CreateRecipe />,
        state: "create.recipe"
    },
    {
        path: "/saved-recipes",
        element: <SavedRecipes />,
        state: "saved.recipes"
    }
];

export default routes;