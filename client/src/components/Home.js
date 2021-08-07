import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Icebear from "../img/icebear.jpg";
import Chiwawa from "../img/chihuahua.gif";
import { Link } from "react-router-dom";
import GitHubIcon from "@material-ui/icons/GitHub";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import "fontsource-roboto";

const useStyle = makeStyles({
  body: {
    fontFamily: "Roboto",
    backgroundColor: "#212121",
    height: "100vh",
    color: "white",
    overflow: "scroll",
    WebkitOverflowScrolling: "touch",
  },
  mainPageButton: {
    width: "150px",
    margin: "15px",
    fontWeight: "bold",
  },
  buttonContainer: {
    textAlign: "center",
  },
  mainImageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "500px",
    width: "500px",
    marginBottom: "15px",
  },
  mainImage: {
    borderRadius: "15px",
    height: "400px",
    width: "350px",
    minHidth: "200px",
    minWidth: "135px",
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    marginRight: "15px",
    marginLeft: "5px",
  },
  mainHeading: {
    marginBottom: "30px",
    marginTop: "60px",
  },
});

const Home = () => {
  const classes = useStyle();
  return (
    <div className={classes.body}>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <h1 className={classes.mainHeading}>Chiwawa Bot</h1>
        <Box className={classes.mainImageContainer}>
          <img src={Chiwawa} className={classes.mainImage}></img>
        </Box>
        <Box className={classes.avatarContainer}>
          <span className={classes.avatarText}>Creator: </span>
          <Avatar size="small" alt="wasd" src={Icebear} />
          <span className={classes.avatarText}>wasd</span>
        </Box>

        <Box p={1} className={classes.buttonContainer}>
          <Button
            startIcon={<FormatListBulletedIcon />}
            variant="contained"
            color="secondary"
            className={classes.mainPageButton}
            component={Link}
            to="/commands"
          >
            Commands
          </Button>
          <Button
            startIcon={<GitHubIcon />}
            className={classes.mainPageButton}
            variant="contained"
            color="primary"
            onClick={() =>
              window.location.assign(
                "https://github.com/b06b01073/discord-music-bot"
              )
            }
          >
            Github
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
