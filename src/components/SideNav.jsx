import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, ListItemButton } from '@mui/material';

export const SideNav = () => {
    return (
        <Box sx={{ maxWidth: 35, backgroundColor: 'rgb(23, 20, 20)', position: 'fixed', top: '60%', transform: 'translateY(-50%)', padding: 2 }}>
            <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/kelvin-gian-228887263/">
                <ListItemButton sx={{ justifyContent: 'center' }}>
                    <LinkedInIcon fontSize="large" style={{ color: 'gray' }} />
                </ListItemButton>
            </a>
            <a rel="noreferrer" target="_blank" href="mailto:kelvingian.business@gmail.com">
                <ListItemButton sx={{ justifyContent: 'center' }}>
                    <EmailIcon fontSize="large" style={{ color: 'gray' }} />
                </ListItemButton>
            </a>
            <a rel="noreferrer" target="_blank" href="https://github.com/kelvin0012">
                <ListItemButton sx={{ justifyContent: 'center' }}>
                    <GitHubIcon fontSize="large" style={{ color: 'gray' }} />
                </ListItemButton>
            </a>
        </Box>
    );
};
