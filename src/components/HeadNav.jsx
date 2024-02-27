import { AppBar, IconButton, Toolbar, Typography, Stack, Button} from "@mui/material"


export const HeadNav = () => {
    return (
        <AppBar sx={{backgroundColor: 'black'}}>
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit' aria-label='logo' disabled='true'> 
                    <img className="profileLogo"
                    src="/assets/profileHeadshot.png"
                    alt="Kelvin Headshot Image"
                    />
                </IconButton>
                <Typography variant='h6' component='div' color='white' sx={{flexGrow: 1}}>
                    KELVIN GIAN
                </Typography>
                <Stack direction="row" spacing={2}>
                    <a href="#home">
                        <Button sx={{color: 'white'}} color='inherit'>Home</Button>
                    </a>
                    <a href="#projects">
                        <Button sx={{color: 'white'}} color='inherit'>Experience</Button>
                    </a>
                    <a href="#skills">
                        <Button sx={{color: 'white'}} color='inherit'>Skills</Button>
                    </a>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}
