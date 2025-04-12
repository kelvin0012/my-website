import { Container } from "@mui/material";
import { Box, Grid } from "@mui/material";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import cppIcon from "../assets/cppIcon.png";
import pythonIcon from "../assets/pythonIcon.png";
import sqlIcon from "../assets/sqlIcon.png";
import htmlIcon from "../assets/htmlIcon.png";
import cssIcon from "../assets/cssIcon.png";
import jsIcon from "../assets/jsIcon.png";
import reactIcon from "../assets/reactIcon.png";
import dynamodbIcon from "../assets/aws-dynamodb.svg";
import nodeIcon from "../assets/nodejs.png"
import javaIcon from "../assets/javaIcon.png"
import mysqlIcon from "../assets/mysqlIcon.png"
import Tooltip from '@mui/material/Tooltip';

export const Skills = () => {
    return (
        <div className="skills">
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={12} style={{ paddingBottom: '10px' }}>
                    <h2 className="skillsTitle">SKILLS</h2>
                </Grid>
                <Grid item xs={6} sm={3} md={1}>
                    <img className="skillsIcon" src={pythonIcon} alt="Python Icon Image" />
                    <p>Python</p>
                </Grid>
                <Grid item xs={6} sm={3} md={1}>
                    <img className="skillsIcon" src={javaIcon} alt="Java Icon Image" />
                    <p>Java</p>
                </Grid>
                <Grid item xs={6} sm={3} md={1}>
                    <img className="skillsIcon" src={reactIcon} alt="React Icon Image" />
                    <p>React</p>
                </Grid>
                <Grid item xs={6} sm={3} md={1}>
                    <img className="skillsIcon" src={jsIcon} alt="JavaScript Icon Image" />
                    <p>JavaScript</p>
                </Grid>
                <Grid item xs={6} sm={3} md={1}>
                    <img className="skillsIcon" src={nodeIcon} alt="Node Icon Image" />
                    <p>Node.js</p>
                </Grid>
                <Grid item xs={6} sm={3} md={1}>
                    <img className="skillsIcon" src={htmlIcon} alt="HTML Icon Image" />
                    <p>HTML</p>
                </Grid>
                <Grid item xs={6} sm={3} md={1}>
                    <img className="skillsIcon" src={cssIcon} alt="CSS Icon Image" />
                    <p>CSS</p>
                </Grid>
                <Grid item xs={6} sm={3} md={1}>
                    <img className="skillsIcon" src={mysqlIcon} alt="MySQL Icon Image" />
                    <p>MySQL</p>
                </Grid>
                <Grid item xs={6} sm={3} md={1}>
                    <img className="skillsIcon" src={dynamodbIcon} alt="DynamoDB Icon Image" />
                    <p>DynamoDB</p>
                </Grid>
            </Grid>
        </div>
    )
}
