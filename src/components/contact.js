import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './about.css'
import {Button, withStyles} from '@material-ui/core';
import teal from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import './firebase.js';
import firebase from 'firebase';

const StyledButton = withStyles({
  root: {
    background: '#19869E',
    borderRadius: 10,
    border: 0,
    color: 'white',
    height: 48,
    width: 144,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(250, 250, 250, 250)',
    top: '38px',
  },
  label: {
    textTransform: 'capitalize'
  }
})(Button);

const useStyles = makeStyles((theme) => ({
  
    palette: {
      primary: teal,
      secondary: green,
    },
    
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
      heading:{
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
      },
    },
      message:{
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '51ch',
        },
    },
  }));


function Contact() {

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const [values, setValues] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        heading: '',
        message: '',
      });

      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
      
      function addMessage() {
        console.log(values)
        let contact_message = values
        let db = firebase.firestore();
          db.collection('Contact-Messages').add({
            Email: contact_message.email,
            FirstName: contact_message.firstName,
            Heading: contact_message.heading,
            LastName: contact_message.lastName,
            Message: contact_message.message
        })
        alert('Email sent')
        setValues({ ...values, firstName: '', lastName: '', email: '', heading:'', message:'' });
    }

  const classes = useStyles();
  return (
    <div className="about">
        <h2>Contact Us Now</h2>
    <form noValidate autoComplete="on" id="contactForm">
      <div>
      <div className={classes.root}>
        <TextField
          id="outlined-multiline-flexible"
          label="First Name"
          multiline
          value={values.firstName}
          onChange={handleChange('firstName')}
          variant="outlined"
        />
        <TextField
          id="outlined-textarea"
          label="Last Name"
          multiline
          value={values.lastName}
          onChange={handleChange('lastName')}
          variant="outlined"
        />
        </div>

        <div className={classes.heading}>
          <TextField
            id="outlined-textarea"
            label="Email"
            multiline
            variant="outlined"
            value={values.email}
            color = "primary"
            onChange={handleChange('email')}
          />
          <TextField
            id="outlined-textarea"
            label="Heading"
            multiline
            variant="outlined"
            value={values.heading}
            onChange={handleChange('heading')}
          />
          </div>

          <div className={classes.message}>
            <TextField
              id="outlined-multiline-static"
              label="Message"
              multiline
              value={values.message}
              onChange={handleChange('message')}
              rows={15}
              variant="outlined"
            />
      </div>
      </div>
    </form>
    <StyledButton variant="outlined" color="19869E" type="submit" onClick={()=>addMessage()}>SUBMIT</StyledButton>
    <br/>
    <br/>
    <hr/>
    </div>
  );
}
export default Contact;

