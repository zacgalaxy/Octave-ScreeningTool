import React, {useEffect, useState} from 'react';
import { Button, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import PageTemplate from "./PageTemplate";
import { Navigate } from 'react-router-dom';
import ProductsContent from "../components/ProductsContent";
// const api = require('../api');
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';

const menuItems = [
    "Home",
    "Analytics",
    "Products",
    "Reports",
    "Settings",
  ];


  const getIcon = (menuItem) => {
    switch (menuItem) {
        case 'Home':
            return <DashboardIcon />;
        case 'Analytics':
            return <AutoGraphIcon />;
        case 'Products':
            return <CategoryIcon />;
        case 'Reports':
            return <ReportGmailerrorredIcon />;
        case 'Settings':
            return <SettingsIcon />;
        default:
            return <DashboardIcon />; 
    }
};
  
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
          case "Analytics":
            return <div>Analytics Content</div>;
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
    <PageTemplate nameofbackground="greyBackground">
            <Box sx={{ display: 'flex'  }}>
            <Drawer
                variant="permanent"
                anchor="left"
                className="customDrawer"
                sx={{ 
                  width: 240, 
                  flexShrink: 0
                }}>
                  <Box
                        component="img"
                        src="/images/logo.jpeg"
                        sx={{
                            height: 100, width: '100%', objectFit: 'contain', marginTop: 2
                        }}
                    />

                <List>
                {menuItems.map((text) => (
                    <ListItem key={text} disablePadding sx={{ color: grey[500] }} >
                    <ListItemButton onClick={() => setActiveMenu(text)} 
                                    className={`menuItem ${activeMenu === text ? 'active' : ''}`}
                                    >
                        <ListItemIcon primary={text} className={`menuItem ${activeMenu === text ? 'active activeListItem' : ''}`}>
                            {getIcon(text)}
                        </ListItemIcon>
                        <ListItemText primary={text}  />
                    </ListItemButton>
                    </ListItem>
                ))}
                </List>

                <Box  className="autoMarginBox">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {/* handle logout logic */}}
                            className="drawerButton"
                        >
                           <LogoutIcon sx={{ mr: 1 }} />
                            Logout
                        </Button>
                    </Box>

            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {renderContent()}
            </Box>
            </Box>
    </PageTemplate>
);}

export default LandingPage;