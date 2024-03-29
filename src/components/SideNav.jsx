import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, ListItemButton } from '@mui/material';

export const SideNav = () => {
    return (
        <Box sx={{ maxWidth: 240, backgroundColor: 'rgb(23, 20, 20)'}}>
            <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/kelvin-gian-228887263/">
                <ListItemButton>
                    <LinkedInIcon fontSize="large" style={{color: 'gray'}}></LinkedInIcon>
                </ListItemButton>
            </a>
            <a rel="noreferrer" target="_blank" href="mailto:kelvingian.business@gmail.com">
                <ListItemButton>
                    <EmailIcon fontSize="large" style={{color: 'gray'}}></EmailIcon>
                </ListItemButton>
            </a>
            <a rel="noreferrer" target="_blank" href="https://github.com/kelvin0012">
                <ListItemButton>
                    <GitHubIcon fontSize="large" style={{color: 'gray'}}></GitHubIcon>
                </ListItemButton>
            </a>
        </Box>

    )
}
