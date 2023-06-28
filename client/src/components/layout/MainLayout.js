import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import GlobalLoading from "../common/GlobalLoading";
import TopNavbar from "../common/TopNavbar";
import {useDispatch, useSelector} from "react-redux";

const MainLayout = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);
    return (
        <>
            {/* global loading */}
            <GlobalLoading />
            {/* global loading */}

            {/* login modal */}
            {/*<AuthModal />*/}
            {/* login modal */}

            <Box display="flex" minHeight="100vh" sx={{}}>
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
                >
                    <Outlet />
                </Box>
                {/* main */}
            </Box>

            {/* footer */}
            {/*<Footer />*/}
            {/* footer */}
        </>
    );
};

export default MainLayout;