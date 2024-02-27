import { Container } from "@mui/material"
import { Box, Grid } from "@mui/material"
import Divider from '@mui/material/Divider';
import {VerticalTimeline, VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import LanguageIcon from '@mui/icons-material/Language';
import accentureLogo from "../assets/accentureLogo.jpg";
import wsuLogo from "../assets/wsuLogo.jpg"
import websiteIcon from "../assets/websiteIcon.png"



export const Projects = () => {
    return (
        <div>
            <div className="projectsTitle">
                <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <h2>EXPERIENCE</h2>
                    </Grid>
                </Grid>
            </div>
            <div className="projects">
                <VerticalTimeline lineColor="gray">
                    <VerticalTimelineElement 
                    className="vertical-timeline-element--education" 
                    date="2020 - 2023" 
                    iconStyle={{background: "white"}} 
                    icon={<img className="wsuLogo"
                        src={wsuLogo}
                        alt="WSU Logo Image"
                        />}>
                        <h3 className="vertica-timeline-element-title">
                            Western Sydney University
                        </h3>
                        <p> Bachelor of Computer Science, Artificial Intelligence Major</p>
                        <p className="Tech"> Awards: 2022 Dean's Merit List</p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement 
                    className="vertical-timeline-element--education" 
                    date="February 2024&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                    iconStyle={{background: "white"}} 
                    icon={<img className="accentureLogo"
                        src={accentureLogo}
                        alt="Accenture Logo Image"
                        />}>
                        <h3 className="vertica-timeline-element-title">
                            Accenture Hackathon
                        </h3>
                        <p>Developed a travel planning assistant app that creates personalised travel times for users when taking trips</p>
                        <p className="Tech">Tech Used: Python, AWS DynamoDB, React </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement 
                    className="vertical-timeline-element--education" 
                    date="February 2024 - " 
                    iconStyle={{background: "white"}} 
                    icon={<img className="websiteIcon"
                    src={websiteIcon}
                    alt="Website Icon Image"
                    />}>
                        <h3 className="vertica-timeline-element-title">
                            Portfolio Website
                        </h3>
                        <p> This very site you are using right now!!</p>
                        <p className="Tech">Tech Used: React</p>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </div>
        </div>
    )
}