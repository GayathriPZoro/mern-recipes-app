import {Home} from "../pages/home";
import {Login} from "../pages/login";
import {Register} from "../pages/register";
import {CreateRecipe} from "../pages/createRecipe";
import {SavedRecipes} from "../pages/savedRecipes";
import {ForgotPassword} from "../pages/forgotPassword";
import {SearchRecipes} from "../pages/searchRecipes";

export const routesGen = {
    login: "/",
    register: "/register",
    home: "/recipes",
    createRecipe: "/create-recipe",
    savedRecipes: "/saved-recipes",
    passwordUpdate: "/password-update",
    searchRecipes: "/search-recipes"
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
    },
    {
        path: "/search-recipes",
        element: <SearchRecipes />,
        state: "search.recipes"
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />,
        state: "forgot.password"
    }
];

export default routes;