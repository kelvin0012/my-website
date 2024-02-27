import { AppBar, IconButton, Toolbar, Typography, Stack, Button} from "@mui/material"
import { Link } from "react-scroll"

export const HeadNav = () => {
    return (
        <AppBar sx={{backgroundColor: 'black'}}>
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit' aria-label='logo' disabled='true'> 
                    <img className="profileLogo"
                    src="./src/assets/profileHeadshot.png"
                    alt="Kelvin Headshot Image"
                    />
                </IconButton>
                <Typography variant='h6' component='div' color='white' sx={{flexGrow: 1}}>
                    KELVIN GIAN
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Link to="homeTitle" smooth duration={500}>
                        <Button sx={{color: 'white'}} color='inherit'>Home</Button>
                    </Link>
                    <Link to="projectsTitle" smooth duration={500}>
                        <Button sx={{color: 'white'}} color='inherit'>Experience</Button>
                    </Link>
                    <Link to="skills" smooth duration={500}>
                        <Button sx={{color: 'white'}} color='inherit'>Skills</Button>
                    </Link>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}
