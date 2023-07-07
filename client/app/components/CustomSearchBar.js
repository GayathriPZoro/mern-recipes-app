import SearchIcon from "@mui/icons-material/Search";
import Clear from "@mui/icons-material/Clear";
import {styled} from "@mui/material/styles";
import {alpha, InputBase} from "@mui/material";
import React, {useEffect, useState} from "react";

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
    display: 'flex',
    border: '1px solid lightgray',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const IconWrapperStyle=(theme) => {
   return {
       padding: theme.spacing(0, 2),
       height: '100%',
       position: 'absolute',
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center'
   }
}
const SearchIconWrapper = styled('div')(({ theme }) => ({
    ...IconWrapperStyle(theme),
    pointerEvents: 'none'
}));

const ClearIconWrapper = styled('div')(({ theme }) => ({
    ...IconWrapperStyle(theme),
    cursor: 'pointer',
    right: 0
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
            width: '33ch',
        },
    },
}));
const CustomSearchBar = ({searchLabel='Search...', handleSearch= ()=>{}}) => {
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
            {searchInput !== '' && (
                <ClearIconWrapper onClick={()=> setSearchInput('')}>
                    <Clear />
                </ClearIconWrapper>
            )}
        </Search>
    )
}
export default CustomSearchBar