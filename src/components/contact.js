import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './about.css'


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
  
//   const [value, setValue] = useState(0);

//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };
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
          rowsMax={4}
        //   value={value}
        //   onChange={handleChange}
          variant="outlined"
        />
        <TextField
          id="outlined-textarea"
          label="Last Name"
          multiline
          variant="outlined"
        />
        </div> 

        <div className={classes.heading}>
          <TextField
            id="outlined-textarea"
            label="Email"
            multiline
            variant="outlined"
          />
          <TextField
            id="outlined-textarea"
            label="Heading"
            multiline
            variant="outlined"
          />
          </div>

          <div className={classes.message}>
            <TextField
              id="outlined-multiline-static"
              label="Message"
              multiline
              rows={20}
              variant="outlined"
            />
      </div>
      </div>
    </form>
    </div>
  );
}
export default Contact;