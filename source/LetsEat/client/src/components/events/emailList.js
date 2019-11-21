import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: theme.spacing(0.5),
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  }));


export default function EmailList(props) {
    const classes = useStyles();
  
    const handleDelete = chipToDelete => () => {
      props.setEmails(chips => chips.filter(chip => chip !== chipToDelete));
    };
  
    return (
      <div className={classes.root}>
        {
            props.self ? 
                <Chip
                    key={0}
                    icon={<TagFacesIcon />}
                    label={"Me"}
                    className={classes.chip}
                />
            : ''
        }
        {
            props.emails ? props.emails.map((data,index) => {  
                return (
                    <Chip
                        key={index+1}
                        label={data}
                        onDelete={props.setEmails ? handleDelete(data) : undefined}
                        className={classes.chip}
                    />
                );
                }) : ''
        }
      </div>
    );
  }