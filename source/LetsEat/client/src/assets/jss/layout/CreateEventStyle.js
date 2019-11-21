import { title, container } from "assets/jss/material-kit-react.js";

const componentsStyle = theme => ({
    sections: {
        [theme.breakpoints.down('xs')]: {
            padding: "50px 12px"
        },
        [theme.breakpoints.up('sm')]: {
            padding: "50px 20px"
        },
    },
    container,
    sectionTitle: {
        ...title,
        marginTop: "30px",
        minHeight: "32px",
        textDecoration: "none"
    },
    brand: {
        color: "#FFFFFF",
        textAlign: "left"
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
            margin: "-85vh 30px 0px",
        },
        [theme.breakpoints.down('sm')]: {
            margin: "-85vh 30px 0px",
        },
        [theme.breakpoints.up('md')]: {
            margin: "-85vh 150px 0px",
        },
        [theme.breakpoints.up('lg')]: {
            minWidth: "900px",
            margin: "-85vh 300px 0px",
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
        margin: "15px 0 15px",
    },
    titleEditButton: {
        margin: "0 0 0 20px"
    },
    dropdownLink: {
        "&,&:hover,&:focus": {
          color: "inherit",
          textDecoration: "none",
          display: "block",
          padding: "10px 20px",
          margin: "0"
        }
    }
});

export default componentsStyle;
