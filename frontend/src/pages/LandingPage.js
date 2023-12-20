import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import PageTemplate from "./PageTemplate";
import { Navigate } from 'react-router-dom';
// const api = require('../api');

const LoginPage = props => {
    const [redirect, setRedirect] = useState(false)
    console.log(process.env.REACT_APP_ENV)

    useEffect(()=>{
        // api.get("AUTH VALIDATION ENDPOINT HERE").then(async response=>{
        //     if(response.status === 200) setRedirect(true)
        // })
        // .catch(e=> setRedirect(true))
        
    }
        , [])
    
    if(redirect) return (<Navigate to="/" /> )  


    return (
    <PageTemplate nameofbackground="whiteBackground">
        <Grid container>
            <Grid item>
                adafafafwafwf
            </Grid>
            
        </Grid>
    </PageTemplate>
);}

export default LoginPage;