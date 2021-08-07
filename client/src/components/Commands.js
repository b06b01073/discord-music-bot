import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HelpIcon from "@material-ui/icons/Help";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SettingsIcon from "@material-ui/icons/Settings";
import "fontsource-roboto";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "50px",
    width: "100%",
    backgroundColor: "#272725",
    height: "100vh",
    overflow: "scroll",
    fontFamily: "Roboto",
  },
  thickText: {
    fontWeight: "bold",
    fontSize: "25px",
  },

  container: {
    minWidth: "500px",
    margin: "auto",
    padding: "30px",
    maxWidth: "1000px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: "33.33%",
    flexShrink: 0,
    color: "#e8e8e8",
    marginLeft: "10px",
    display: "inline-block",
  },
  topHeading: {
    textAlign: "center",
    fontSize: "40px",
    color: "#e8e8e8",
    marginBottom: "25px",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(20),
    color: "#e8e8e8",
  },
  description: {
    color: "#333a56",
    fontSize: "20px",
  },
  accordion: {
    backgroundColor: "#A43020",
    minWidth: "350px",
    "&:hover": {
      backgroundColor: "#f39189",
    },
  },
  commandWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    marginRight: "100px",
    minWidth: "300px",
  },
}));

export default function Commands() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <h1 className={classes.topHeading}>A Quick Guide</h1>
      <div className={classes.container}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className={classes.accordion}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className={classes.commandWrapper}>
              <HelpIcon className={classes.icons} />
              <Typography className={classes.heading}>Help</Typography>
            </div>
            <Typography className={classes.secondaryHeading}>
              &lt;!help | !h&gt;
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.description}>
              <span className={classes.thickText}>Description</span> Print the
              link of this page in discord channel.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            className={classes.accordion}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className={classes.commandWrapper}>
              <ExitToAppIcon />
              <Typography className={classes.heading}>Quit</Typography>
            </div>
            <Typography className={classes.secondaryHeading}>
              &lt;!quit | !q&gt;
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.description}>
              <span className={classes.thickText}>Description</span> Make the
              bot leave the voice channel.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            className={classes.accordion}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className={classes.commandWrapper}>
              <PlayCircleFilledIcon />
              <Typography className={classes.heading}>Play music</Typography>
            </div>
            <Typography className={classes.secondaryHeading}>
              &lt;!play | !p&gt; &lt;youtube link | keyword&gt;
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.description}>
              <span className={classes.thickText}>Description</span>
              <br></br>
              Play a song from Youtube.
              <br></br>
              <br />
              <span className={classes.thickText}>Example</span>
              <br></br>
              !play
              https://www.youtube.com/watch?v=QF08nvtHHCY&amp;ab_channel=Black%26White
              <br></br>
              !play lofi music
              <br></br>
              <br></br>
              The first exapmle is search by link, the second one is search by
              keyword.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            className={classes.accordion}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className={classes.commandWrapper}>
              <FormatListBulletedIcon />
              <Typography className={classes.heading}>List</Typography>
            </div>
            <Typography className={classes.secondaryHeading}>
              &lt;!list | !ls | !l&gt;
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.description}>
              <span className={classes.thickText}>Description</span> Show
              current playlist.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary
            className={classes.accordion}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className={classes.commandWrapper}>
              <SkipNextIcon />
              <Typography className={classes.heading}>Skip</Typography>
            </div>
            <Typography className={classes.secondaryHeading}>
              &lt;!skip | !s&gt;
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.description}>
              <span className={classes.thickText}>Description</span> Skip
              currently playing music.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel6"}
          onChange={handleChange("panel6")}
        >
          <AccordionSummary
            className={classes.accordion}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className={classes.commandWrapper}>
              <SettingsIcon />
              <Typography className={classes.heading}>Set</Typography>
            </div>
            <Typography className={classes.secondaryHeading}>
              !set &lt;message&gt; &lt;response&gt;
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.description}>
              <span className={classes.thickText}>Description</span>
              <br />
              設定回覆訊息，當設定完成後，下次在discord頻道輸入message時，bot將會回覆response
              <br />
              <br />
              <span className={classes.thickText}>Example</span>
              <br />
              !set 嗨 你好
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
