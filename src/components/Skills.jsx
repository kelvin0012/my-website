import { Container } from "@mui/material"
import { Box, Grid } from "@mui/material"
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';



export const Skills = () => {
    return (
        <div className="skills">
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={4}>
                <Grid item xs={12}>
                    <h2>SKILLS</h2>
                </Grid>
                <Grid item xs={1}>
                    <img className="skillsIcon" src="./src/assets/cppIcon.png" alt="CPP Icon Image"/>
                    <p>C++</p>
                </Grid>
                <Grid item xs={1}>
                    <img className="skillsIcon" src="./src/assets/pythonIcon.png" alt="Python Icon Image"/>
                    <p>Python</p>
                </Grid>
                <Grid item xs={1}>
                    <img className="skillsIcon" src="./src/assets/sqlIcon.png" alt="SQL Icon Image"/>
                    <p>SQL</p>
                </Grid>
                <Grid item xs={1}>
                    <img className="skillsIcon" src="./src/assets/htmlIcon.png" alt="HTML Icon Image"/>
                    <p>HTML</p>
                </Grid>
                <Grid item xs={1}>
                    <img className="skillsIcon" src="./src/assets/cssIcon.png" alt="CSS Icon Image"/>
                    <p>CSS</p>
                </Grid>
                <Grid item xs={1} sx={{paddingRight: 7}}>
                    <img className="skillsIcon" src="./src/assets/jsIcon.png" alt="JavaScript Icon Image"/>
                    <p>JavaScript</p>
                </Grid>
                <Grid item xs={1}>
                    <img className="skillsIcon" src="./src/assets/reactIcon.png" alt="React Icon Image"/>
                    <p>React</p>
                </Grid>
                <Grid item xs={1}>
                    <img className="skillsIcon" src="./src/assets/aws-dynamodb.svg" alt="DynamoDB Icon Image"/>
                    <p>DynamoDB</p>
                </Grid>
            </Grid>       
        </div>
    )
}