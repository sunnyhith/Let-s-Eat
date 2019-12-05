import { title, container } from "assets/jss/material-kit-react.js";

const componentsStyle = theme => ({
    sections: {
        [theme.breakpoints.down('xs')]: {
            padding: "20px 12px 30px"
        },
        [theme.breakpoints.up('sm')]: {
            padding: "20px 20px 30px"
        },
    },
    container,
    sectionTitle: {
        ...title,
        marginTop: "20px",
        minHeight: "32px",
        textDecoration: "none"
    },
    sectionBody: {
        ...title,
        marginTop: "0",
        marginBottom: "0",
        minHeight: "32px",
        padding: "0 5px",
        textDecoration: "none"
    },
    brand: {
        color: "#FFFFFF",
        textAlign: "left"
    },
    eventName: {
        marginBottom: "0",
    },
    title: {
        fontSize: "4.2rem",
        fontWeight: "600",
        display: "inline-block",
        position: "relative"
    },
    subtitle: {
        fontSize: "1.313rem",
        maxWidth: "500px",
        margin: "35px 0 0"
    },
    listTitle: {
        fontSize: "1.313rem",
        maxWidth: "500px",
        margin: "20px 0 20px"
    },
    listSubtitle: {
        fontSize: "1.1rem",
        maxWidth: "500px",
        margin: "10px 0 0 5px"
    },
    main: {
        background: "#FFFFFF",
        position: "relative",
        zIndex: "3"
    },
    mainRaised: {
        borderRadius: "6px",
        minHeight: "500px",
        boxShadow:
            "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
        [theme.breakpoints.down('xs')]: {
            margin: "-85vh 30px 200px",
        },
        [theme.breakpoints.down('sm')]: {
            margin: "-85vh 30px 200px",
        },
        [theme.breakpoints.up('md')]: {
            margin: "-85vh 150px 200px",
        },
        [theme.breakpoints.up('lg')]: {
            minWidth: "900px",
            margin: "-85vh 300px 200px",
        },
    },
    link: {
        textDecoration: "none"
    },
    textCenter: {
        textAlign: "center"
    },
    label: {
        color: "error",
        display: "inline-flex",
        fontSize: "11px",
        transition: "0.3s ease all",
        lineHeight: "1.428571429",
        fontWeight: "400",
        paddingLeft: "0",
        letterSpacing: "normal"
    },
    placeholderText: {
        "& input": {
            cursor: "pointer",
        },
        "& input::placeholder": {
            color: "#AAAAAA",
            opacity: 1 /* Firefox */
        }
    },
    rightOperation: {
        textAlign: "right",
    },
    submitButton: {
        marginTop: "50px",
    },
    editButton: {
        margin: "-20px 0 0",
        paddingLeft: "5px",
        paddingRight: "5px",
    },
    titleEditButton: {
        margin: "0 0 0 20px"
    },
    respondText: {
        fontSize: "16px",
        fontWeight: "500",
        display: "inline-block",
        margin: "15px 10px 15px 0"
    },
    respondButton: {
        margin: "0 20px 5px 0",
        [theme.breakpoints.up('xs')]: {
            padding: "5px 10px 5px 10px",
        },
        [theme.breakpoints.up('md')]: {
            padding: "5px 20px 5px 20px",
        },
    },
    statusDropdown: {
        display: "inline-block",
        marginLeft: "20px",
    },
    dropdownLink: {
        "&,&:hover,&:focus": {
          color: "inherit",
          textDecoration: "none",
          display: "block",
          padding: "10px 20px",
          margin: "0"
        }
    },
    infoText: {
        fontWeight: "200",
        color: "gray",
        marginLeft: "5px",
        marginBottom: "5px",
    },
    infoIcon: {
        minWidth: "25px",
    },
    tabContainer: {
        padding: "20px 10px",
        marginLeft: "0",
        marginRight: "0",
    }
});

export default componentsStyle;
