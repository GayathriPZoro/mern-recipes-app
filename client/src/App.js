import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ThemeProvider } from "@mui/material/styles";
import routes from "./routes/routes";
import MainLayout from "./components/layout/MainLayout";
import {useSelector} from "react-redux";
import themeConfigs from "./config/theme.configs";
import PageWrapper from "./components/common/PageWrapper";
import NotFound from "./pages/notFound";

function App() {
    const { themeMode } = useSelector((state) => state.themeMode);
  return (
        <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
          <Router>
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
              </Routes>
          </Router>
        </ThemeProvider>
  );
}

export default App;
