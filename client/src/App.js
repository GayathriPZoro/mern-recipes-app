import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Home} from "./pages/home";
import {CreateRecipe} from "./pages/createRecipe";
import {Login} from "./pages/login";
import {SavedRecipes} from "./pages/savedRecipes";
import {Navbar} from "./components/navbar"
import {Register} from "./pages/register";
import { ThemeProvider } from "@mui/material/styles";

import routes from "./routes/routes";
import MainLayout from "./components/layout/MainLayout";
import {useSelector} from "react-redux";
import themeConfigs from "./config/theme.configs";
import TopNavbar from "./components/common/TopNavbar";
import PageWrapper from "./components/common/PageWrapper";
import NotFound from "./pages/notFound";

function App() {
    const { themeMode } = useSelector((state) => state.themeMode);
  return (
        <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
          <Router>
            {/*<Navbar />*/}
              <Routes>
                <Route path="/" element={<MainLayout />}>
                    {routes.map((route, index) => (
                        route.index ? (
                            <Route
                                index
                                key={index}
                                element={route.state ? (
                                    <PageWrapper state={route.state}>{route.element}</PageWrapper>
                                ) : route.element}
                            />
                        ) : (
                            <Route
                                path={route.path}
                                key={index}
                                element={route.state ? (
                                    <PageWrapper state={route.state}>{route.element}</PageWrapper>
                                ) : route.element}
                            />
                        )
                    ))}
                    <Route path={'*'} element={<NotFound />}/>
                </Route>
              </Routes>        {/*<Routes>*/}
            {/*  <Route path={"/"} element={<Login />} />*/}
            {/*  <Route path={"/recipes"} element={<Home />} />*/}
            {/*  <Route path={"/login"} element={<Login />} />*/}
            {/*  <Route path={"/register"} element={<Register />} />*/}
            {/*  <Route path={"create-recipe"} element={<CreateRecipe />} />*/}
            {/*  <Route path={"/saved-recipes"} element={<SavedRecipes />} />*/}
            {/*</Routes>*/}
          </Router>
        </ThemeProvider>
  );
}

export default App;
