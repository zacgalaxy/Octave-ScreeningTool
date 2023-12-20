import React from 'react';
import { Card, CardContent, Typography, ButtonBase, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'; // Example icon
import AnalyticsIcon from '@mui/icons-material/Analytics'; // Example icon
import ReportIcon from '@mui/icons-material/Report'; // Example icon
import SettingsIcon from '@mui/icons-material/Settings'; 


const ProductsContent = ({ }) => {
    const theme = useTheme();
    const cardsData = [
        { title: "Screening", description: "The description here", icon: <HomeIcon  /> },
        { title: "Analysis", description: "The description here", icon: <AnalyticsIcon /> },
        { title: "Reporting", description: "The description here", icon: <ReportIcon /> },
        { title: "Management", description: "The description here", icon: <SettingsIcon /> },
    ];

    const handleCardClick = (cardTitle) => {
        // TODO: My suggestion is to use a ReactHook to change the app-wide state 
        // where it changes the content being rendered when a user clicks on the screening tool
    };


    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {cardsData.map(card => (
            <ButtonBase 
                key={card.title} 
                onClick={() => handleCardClick(card.title)} 
                style={{ 
                    margin: theme.spacing(1), 
                    width: `calc(25% - ${theme.spacing(2)})`, 
                    maxWidth: 300, 
                }}
            >
                <Card sx={{ width: '100%', borderRadius: theme.shape.borderRadius  }}>
                    <CardContent sx={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}>
                        {React.cloneElement(card.icon, { sx: { fontSize: '70px' } })}
                        <Typography gutterBottom variant="h5" component="div" sx={{ backgroundColor: theme.palette.primary.dark, color: theme.palette.getContrastText(theme.palette.primary.dark), width: '100%' }}>
                            {card.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {card.description}
                        </Typography>
                    </CardContent>
                </Card>
            </ButtonBase>
        ))}
    </div>
    );
}

export default ProductsContent;