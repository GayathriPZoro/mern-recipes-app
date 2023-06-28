import { useState } from "react";
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import Menu from '@mui/icons-material/Menu'
import Home from '@mui/icons-material/Home'
import ExitToApp from '@mui/icons-material/ExitToApp'

import { Link } from "react-router-dom";

function MenuDrawerComponent({cookies, logout}) {
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <>
            <Drawer
                sx={{
                    color: 'primary.main'
                }}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <List
                    aria-labelledby="My Recipes App Menu"
                    subheader={
                        <ListSubheader component="div" id="My Recipes App Menu">
                            My Recipes App Menu
                        </ListSubheader>
                    }
                >
                    <ListItem onClick={() => setOpenDrawer(false)} button>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText>
                            <Link to="/recipes">Home</Link>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    {cookies.access_token ? (
                        <>

                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText>
                                    <Link to="/recipes">Recipes</Link>
                                    <List>
                                        <ListItem>
                                            <ListItemText>
                                                <Link to="/recipes">All Recipes</Link>
                                            </ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText>
                                                <Link to="/create-recipe">Create Recipe</Link>
                                            </ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText>
                                                <Link to="/saved-recipes">Favorite Recipes</Link>
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                </ListItemText>
                            </ListItem>
                            <Divider />
                            <Button
                                sx={{m:2}}
                                startIcon={<ExitToApp />}
                                variant={'contained'} onClick={()=>{
                                logout()
                                setOpenDrawer(false)
                            }}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText>
                                    <Link to="/Login">Login</Link>
                                </ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText>
                                    <Link to="/Register">Register</Link>
                                </ListItemText>
                            </ListItem>
                        </>
                    )}
                </List>
            </Drawer>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
                <Menu />
            </IconButton>
        </>
    );
}
export default MenuDrawerComponent;