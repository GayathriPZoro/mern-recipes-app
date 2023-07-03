import SearchIcon from "@mui/icons-material/Search";
import {styled} from "@mui/material/styles";
import {alpha, InputBase} from "@mui/material";
import React, {useEffect, useState} from "react";
import {searchRecipes} from "../../services/services";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.5),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '40ch',
        },
    },
}));
export const CustomSearch = ({searchLabel='Search...', handleSearch= ()=>{}}) => {
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const getData = setTimeout(() => {
            handleSearch(searchInput)
        }, 2000)

        return () => clearTimeout(getData)
    }, [searchInput]);

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                value={searchInput}
                onChange={(e)=> {
                    setSearchInput(e.target.value)
                }}
                placeholder={searchLabel}
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    )
}