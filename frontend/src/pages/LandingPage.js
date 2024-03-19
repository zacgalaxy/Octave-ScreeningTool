import React, {useEffect, useState} from 'react';
import { Button, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import PageTemplate from "./PageTemplate";
import { Navigate } from 'react-router-dom';
import ProductsContent from "../components/ProductsContent";
import ScreeningTool from './ScreeningTool';
// const api = require('../api');
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import meifImage from '../images/meif.jpg'
import { Routes, Route, Link, useLocation } from 'react-router-dom';

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
    const [redirect, setRedirect] = useState(false);
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState(menuItems[2]);
    const theme = useTheme();

    useEffect(()=>{
        const path = location.pathname.split('/')[1];
        if (menuItems.map(item => item.toLowerCase()).includes(path)) {
            setActiveMenu(path.charAt(0).toUpperCase() + path.slice(1));      
    }
    }, [location]);
    
    if(redirect) return (<Navigate to="/" /> )  

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
                        src={meifImage}
                        sx={{
                            height: 100, width: '100%', objectFit: 'contain', marginTop: 2
                        }}
                    />

                <List>
                {menuItems.map((text) => (
                    <ListItem key={text} disablePadding sx={{ color: grey[500] }} >
                       <Link to={`/${text.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton className={`menuItem ${activeMenu.toLowerCase() === text.toLowerCase() ? 'active' : ''}`}
                                    >
                        <ListItemIcon primary={text} className={`menuItem ${activeMenu === text ? 'active activeListItem' : ''}`}>
                            {getIcon(text)}
                        </ListItemIcon>
                        <ListItemText primary={text}  />
                    </ListItemButton>
                    </Link>
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
            <Routes>
                <Route path="/home" element={<div>Home Content</div>} />
                <Route path="/analytics" element={<div>Analytics Content</div>} />
                <Route path="/products" element={<ProductsContent />} />
                <Route path="/products/screeningtool" element={<ScreeningTool />} />
                <Route path="/reports" element={<div>Reports Content</div>} />
                <Route path="/settings" element={<div>Settings Content</div>} />
            </Routes> 
            </Box>
            </Box>
    </PageTemplate>
);}

export default LandingPage;