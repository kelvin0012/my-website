import { Box, Container, Grid } from "@mui/material"
import Divider from '@mui/material/Divider';


export const Home = () => {
    return (
        <div className="home">
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <h1 className='title'>HELLO! I&apos;M KELVIN GIAN</h1>
                </Grid>
                <Grid item xs={12}>
                    <p className="subtitle">A Graduate Software Engineer at Optus. </p>
                </Grid>
            </Grid>
        </div>
    )
}
