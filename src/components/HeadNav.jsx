import { AppBar, IconButton, Toolbar, Typography, Stack, Button, Drawer, List, ListItem } from "@mui/material";
import { Link } from "react-scroll";
import profileHeadshot from "../assets/profileHeadshot.png";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

export const HeadNav = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleLinkClick = () => {
        setDrawerOpen(false);
    };

    const drawer = (
        <List sx={{ backgroundColor: 'black', height: '100%', color: 'white' }}>
            <ListItem onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); handleLinkClick(); }} sx={{ justifyContent: 'center' }}>
                <Button className="underlineHover" sx={{ color: 'white', width: '100%' }} color='inherit'>Home</Button>
            </ListItem>
            <ListItem sx={{ justifyContent: 'center' }}>
                <Link to="projectsTitle" smooth duration={500} style={{ width: '100%' }} onClick={handleLinkClick}>
                    <Button className="underlineHover" sx={{ color: 'white', width: '100%' }} color='inherit'>Experience</Button>
                </Link>
            </ListItem>
            <ListItem sx={{ justifyContent: 'center' }}>
                <Link to="skills" smooth duration={500} style={{ width: '100%' }} onClick={handleLinkClick}>
                    <Button className="underlineHover" sx={{ color: 'white', width: '100%' }} color='inherit'>Skills</Button>
                </Link>
            </ListItem>
        </List>
    );

    return (
        <AppBar sx={{ backgroundColor: 'rgb(13, 12, 12)' }}>
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit' aria-label='logo' disabled>
                    <img className="profileLogo" src={profileHeadshot} alt="Kelvin Headshot Image" />
                </IconButton>
                <Typography variant='h6' component='div' color='white' sx={{ flexGrow: 1 }}>
                    KELVIN GIAN
                </Typography>
                <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    <a onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <Button className="underlineHover" sx={{ color: 'white' }} color='inherit'>Home</Button>
                    </a>
                    <Link to="projectsTitle" smooth duration={500}>
                        <Button className="underlineHover" sx={{ color: 'white' }} color='inherit'>Experience</Button>
                    </Link>
                    <Link to="skills" smooth duration={500}>
                        <Button className="underlineHover" sx={{ color: 'white' }} color='inherit'>Skills</Button>
                    </Link>
                </Stack>
                <IconButton edge="end" color="inherit" aria-label="menu" sx={{ display: { xs: 'flex', sm: 'none' } }} onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>
                <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)} PaperProps={{ sx: { backgroundColor: 'black', color: 'white' } }}>
                    {drawer}
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};
