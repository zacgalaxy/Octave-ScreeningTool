import React from 'react';
import Grid from '@mui/material/Grid';
// import FooterBar from "../components/general/FooterBar";
// import HeaderBar from "../components/general/HeaderBar";
// import FallbackComponent from '../components/general/FallbackComponent';

const PageTemplate = ({ content, children, nameofbackground = "greyBackground", displayHeader = false,  ...rest}) => {

    // Enable dynamic backgrounds for tools like screening tool with custom CSS
    // if( nameofbackground === "" ){nameofbackground = "texturedBackground";}

    return (
            <div className={nameofbackground} style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
                 {/* <HeaderBar {...rest} displayHeader={displayHeader} /> */}
                    <Grid container style={{ flexGrow: 1, margin: 0, padding: 0 }}>
                        <Grid item xs={12}>
                            {content || children}
                        </Grid>
                    </Grid>
                 <Grid style={{ flex: 1, margin: 0, padding: 0 }} />
                 {/* <FooterBar /> */}
            </div>
    );
}

export default PageTemplate;

