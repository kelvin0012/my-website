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
import unihack2024Icon from "../assets/unihack2024Icon.png"



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
                    date={<span style={{ color: "white" }}>2020 - 2023</span>}
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
                    date={<span style={{ color: "white" }}>February 2024&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>}
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
                    date={<span style={{ color: "white" }}>February 2024 - </span>} 
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
                    <VerticalTimelineElement 
                    className="vertical-timeline-element--education" 
                    date={<span style={{ color: "white" }}>March 2024</span>} 
                    iconStyle={{background: "white"}} 
                    icon={<img className="websiteIcon"
                    src={unihack2024Icon}
                    alt="unihack2024 Icon Image"
                    />}>
                        <h3 className="vertica-timeline-element-title">
                            Atlassian x UNIHACK
                        </h3>
                        <p> Developed a slackbot that uses AI to summarise conversations from the past number of days, hours, or messages and displays the summary on a website</p>
                        <p className="Tech">Tech Used: React, Python</p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement 
                    className="vertical-timeline-element--education" 
                    date={<span style={{ color: "white" }}>March 2024 - </span>} 
                    iconStyle={{background: "white"}} 
                    icon={<img className="websiteIcon"
                    src={wsuLogo}
                    alt="WSU Icon Image"
                    />}>
                        <h3 className="vertica-timeline-element-title">
                            Web Developer Intern
                        </h3>
                        <p> Currently a part of the Developer team for the Work Place Management Information System Project</p>
                        <p className="Tech">Tech Used: React, Python</p>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </div>
        </div>
    )
}