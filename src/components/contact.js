import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './about.css'
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        color: 'teal',
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

  const classes = useStyles();
  return (
      <div>
        <h2> Contact Us Now</h2>
    <form noValidate autoComplete="off">
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
    <Button variant="contained" color="primary" onSubmit={handleChange}>Submit</Button>
    <hr/>
    </div>
  );
}
export default Contact;