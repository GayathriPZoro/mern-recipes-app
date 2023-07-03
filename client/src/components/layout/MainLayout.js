import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";
import TopNavbar from "../common/TopNavbar";
import {useDispatch, useSelector} from "react-redux";
import backingImage from '../../assests/vegetarian-recipes.jpg'
import myRecipesImg from '../../assests/myrecipes2.jpg'
const MainLayout = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);
    return (
        <>
            {/* global loading */}
            <GlobalLoading />
            {/* global loading */}

            <Box display="flex" minHeight="100vh">
                {/* header */}
                <TopNavbar />
                {/* header */}
                {/* main */}
                <Box
                    component="main"
                    flexGrow={1}
                    overflow="hidden"
                    minHeight="100vh"
                    m={'auto'}
                    display={'flex'}
                    sx={{backgroundImage: `url(${user ? myRecipesImg : backingImage})`, backgroundRepeat: 'no-repeat'}}
                >
                    <Outlet />
                </Box>
                {/* main */}
            </Box>
        </>
    );
};

export default MainLayout;