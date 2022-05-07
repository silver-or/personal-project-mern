import React from "react";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import styles from '@/styles/Footer.module.css'

export function Footer(){
    return (<footer>
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
                Pet Diary
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    </footer>)
}