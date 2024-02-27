import { Box, Container, Grid } from "@mui/material"
import Divider from '@mui/material/Divider';


export const Home = () => {
    return (
        <div className="home">
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <h1 className="homeTitle">HELLO! I'M KELVIN GIAN</h1>
                </Grid>
                <Grid item xs={12}>
                    <p>A recent Computer Science graduate from Western Sydney University. </p>
                </Grid>
            </Grid>
        </div>
    )
}
