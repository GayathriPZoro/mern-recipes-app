import React from 'react';
import Link from 'next/link';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'

const NotFound = () => (
    <Box sx={{m: 'auto'}}>
        <Typography variant={'h3'}>404 - Not Found!</Typography>
        <Typography variant={'subtitle1'} sx={{textAlign: 'center'}}>(Under implementation)</Typography>
        <Link href="/recipes" style={{display:'flex', justifyContent: 'center', marginTop: '3%'}}><Button variant={'contained'}> Go Home</Button></Link>
    </Box>
);

export default NotFound;