import React, {useEffect, useState} from 'react';
import { Button, Box, Drawer, List, ListItem, ListItemButton, ListItemText, useTheme } from '@mui/material';
import PageTemplate from "./PageTemplate";
import { Navigate } from 'react-router-dom';
import ProductsContent from "../components/ProductsContent";
// const api = require('../api');

const menuItems = [
    "Home",
    "Portfolio Analytics",
    "Products",
    "Reports",
    "Settings",
  ];
  
const LandingPage = props => {
    const [redirect, setRedirect] = useState(false)
    const [activeMenu, setActiveMenu] = useState(menuItems[2]);
    const theme = useTheme();

    useEffect(()=>{
        // api.get("AUTH VALIDATION ENDPOINT HERE").then(async response=>{
        //     if(response.status === 200) setRedirect(true)
        // })
        // .catch(e=> setRedirect(true))
        
    }
        , [])
    
    if(redirect) return (<Navigate to="/" /> )  

    const renderContent = () => {
        switch (activeMenu) {
          case "Home":
            return <div>Home Content</div>;
          case "Portfolio Analytics":
            return <div>Portfolio Analytics Content</div>;
          case "Products":
            return <ProductsContent />;
          case "Reports":
            return <div>Reports Content</div>;
          case "Settings":
            return <div>Settings Content</div>;
          default:
            return <div>Welcome!</div>;
        }
      };
    


    return (
    <PageTemplate nameofbackground="whiteBackground">
        return (
            <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' } }}>
                  <Box
                        component="img"
                        src="/images/logo.jpeg"
                        sx={{
                            height: 100, width: '100%', objectFit: 'contain', marginTop: 2
                        }}
                    />

                <List>
                {menuItems.map((text) => (
                    <ListItem key={text} disablePadding>
                    <ListItemButton onClick={() => setActiveMenu(text)} sx={{ 
                                        backgroundColor: activeMenu === text ? theme.palette.primary.main : 'inherit',
                                        color: activeMenu === text ? theme.palette.primary.contrastText : 'inherit',
                                        '&:hover': {
                                            backgroundColor: activeMenu === text ? theme.palette.primary.dark : 'inherit',
                                            color: activeMenu === text ? theme.palette.primary.contrastText : 'inherit',
                                        },
                                    }}>
                        <ListItemText primary={text} />
                    </ListItemButton>
                    </ListItem>
                ))}
                </List>

                <Box sx={{ marginTop: 'auto', p: 1 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {/* handle logout logic */}}
                            sx={{ width: '100%' }}
                        >
                            Logout
                        </Button>
                    </Box>

            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {renderContent()}
            </Box>
            </Box>
        );
    </PageTemplate>
);}

export default LandingPage;