import { Box } from "@mui/material";
import GlobalLoading from "./components/GlobalLoading";
import TopNavbar from "./components/TopNavbar";
const MainLayout = ({children}) => {
    return (
        <>
            <GlobalLoading />
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
                >
                    {children}
                </Box>
                {/* main */}
            </Box>
        </>
    );
};

export default MainLayout;