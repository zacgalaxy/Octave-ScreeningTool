import { Typography } from '@mui/material'

const FooterBar = () => {
    return (
        <Typography align='center'>
            {"Copyright © "}
            MEIF{" "}
            {new Date().getFullYear()}
        </Typography>
    )
}

export default FooterBar;
