import { title, container } from "assets/jss/material-kit-react.js";

const dashboardStyle = theme => ({
    container: {
        ...container,
        marginTop:"-15vh",
    },
    brand: {
      color: "#FFFFFF",
      textAlign: "left"
    },
    title: {
      textShadow:  "2px 0 10px rgba(0, 0, 0, 0.50)",
      fontSize: "3.2rem",
      fontWeight: "600",
      display: "inline-block",
      position: "relative"
    },
    subtitle: {
      textShadow:  "2px 0 5px rgba(0, 0, 0, 0.50)",
      fontSize: "1.313rem",
      maxWidth: "500px",
      margin: "10px 0 0"
    },
    link: {
        marginLeft: "10px",
        "&,&:hover": {
            color: "inherit", 
        }        
    },
    listTitle: {
        position: "relative",
    },
    mainRaised: {
        [theme.breakpoints.down('xs')]: {
            margin: "-30vh 30px 0px",
        },
        [theme.breakpoints.down('sm')]: {
            margin: "-30vh 5vw 0px",
        },
        [theme.breakpoints.up('md')]: {
            margin: "-30vh 10vw 0px",
        },
        [theme.breakpoints.up('lg')]: {
            margin: "-30vh 20vw 0px",
        },
    },
});

export default dashboardStyle;
