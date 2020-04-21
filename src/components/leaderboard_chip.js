import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/styles';
import { textAlign } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
    header: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'auto',
      whiteSpace: 'normal',
      wordbreak: 'break-all',
    }
  }));

const StyledChip = withStyles({
  root:{
    height: 100,
    width: 300,
    borderRadius: 200/2,
    '& $avatar': {
      height: 50,
      width: 50, 
    },
    label:{
      whiteSpace: 'normal',
      overflow: 'visible',
      textAlign: 'center',
      wordbreak: 'break-all',
    }
  },
  avatar:{},
})(Chip);

export default function LeaderboardChip(props) {
    const classes = useStyles();
    if (props.border === 'gold'){
      return(
        <div className={classes.root}>
          <StyledChip variant="outlined" avatar={<Avatar>Z</Avatar>} style={{border: '1px solid gold'}} label={<p className={classes.header}>{props.label}</p>}/>
        </div> 
      );          
    }
    else if (props.border === 'silver'){
      return(
        <div className={classes.root}>
          <StyledChip variant="outlined" avatar={<Avatar>M</Avatar>} style={{border: '1px solid #C0C0C0'}} label={<p className={classes.header}>{props.label}</p>}/>
        </div>
      );
    }
    else if (props.border === 'bronze') {
      return (
        <div className={classes.root}>
          <StyledChip variant="outlined" avatar={<Avatar>M</Avatar>} style={{border: '1px solid #CD7F32'}} label={<p className={classes.header}>{props.label}</p>}/>
        </div>
      );
    }
    else if (props.border === 'green') {
      return (
        <div className={classes.root}>
          <StyledChip variant="outlined" avatar={<Avatar>M</Avatar>} style={{border: '1px solid green'}} label={<p className={classes.header}>{props.label}</p>}/>
        </div>
      );
    }
    else {
      return (
        <div className={classes.root}>
          <StyledChip variant="outlined" avatar={<Avatar>M</Avatar>} style={{border: '1px solid blue'}} label={<p className={classes.header}>{props.label}</p>}/>
        </div>
      );
    }
}