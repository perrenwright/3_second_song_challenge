// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import './about.css'
// import {Button, withStyles} from '@material-ui/core';
// import teal from '@material-ui/core/colors/purple';
// import green from '@material-ui/core/colors/green';
// import './firebase.js';
// import firebase from 'firebase';

// const StyledButton = withStyles({
//   root: {
//     background: '#19869E',
//     borderRadius: 10,
//     border: 0,
//     color: 'white',
//     height: 48,
//     width: 144,
//     padding: '0 30px',
//     boxShadow: '0 3px 5px 2px rgba(250, 250, 250, 250)',
//     top: '38px',
//   },
//   label: {
//     textTransform: 'capitalize'
//   }
// })(Button);

// const useStyles = makeStyles((theme) => ({
  
//     palette: {
//       primary: teal,
//       secondary: green,
//     },
    
//     root: {
//       '& .MuiTextField-root': {
//         margin: theme.spacing(1),
//         width: '25ch',
//       },
//     },
//       heading:{
//         '& .MuiTextField-root': {
//           margin: theme.spacing(1),
//           width: '25ch',
//       },
//     },
//       message:{
//         '& .MuiTextField-root': {
//           margin: theme.spacing(1),
//           width: '51ch',
//         },
//     },
//   }));


// function Contact() {

//   const [open, setOpen] = React.useState(false);
//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//     const [values, setValues] = React.useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         heading: '',
//         message: '',
//       });

//       const handleChange = (prop) => (event) => {
//         setValues({ ...values, [prop]: event.target.value });
//       };
      
//       function addMessage() {
//         let contact_message = values
//         let db = firebase.firestore();
//           db.settings({
//             timestampsInSnapshots: true
//           });
//           db.collection('Contact-Messages').add({
//             Email: contact_message.email,
//             FirstName: contact_message.firstName,
//             Heading: contact_message.heading,
//             LastName: contact_message.lastName,
//             Message: contact_message.message
//         })
//     }

//   const classes = useStyles();
//   return (
//     <div className="about">
//         <h2>Contact Us Now</h2>
//     <form noValidate autoComplete="on" id="contactForm">
//       <div>
//       <div className={classes.root}>
//         <TextField
//           id="outlined-multiline-flexible"
//           label="First Name"
//           multiline
//           value={values.firstName}
//           onChange={handleChange('firstName')}
//           variant="outlined"
//         />
//         <TextField
//           id="outlined-textarea"
//           label="Last Name"
//           multiline
//           value={values.lastName}
//           onChange={handleChange('lastName')}
//           variant="outlined"
//         />
//         </div>

//         <div className={classes.heading}>
//           <TextField
//             id="outlined-textarea"
//             label="Email"
//             multiline
//             variant="outlined"
//             value={values.email}
//             color = "primary"
//             onChange={handleChange('email')}
//           />
//           <TextField
//             id="outlined-textarea"
//             label="Heading"
//             multiline
//             variant="outlined"
//             value={values.heading}
//             onChange={handleChange('heading')}
//           />
//           </div>

//           <div className={classes.message}>
//             <TextField
//               id="outlined-multiline-static"
//               label="Message"
//               multiline
//               value={values.message}
//               onChange={handleChange('message')}
//               rows={15}
//               variant="outlined"
//             />
//       </div>
//       </div>
//     </form>
//     <StyledButton variant="outlined" color="19869E" type="submit" onSubmit={addMessage()}>SUBMIT</StyledButton>
//     <br/>
//     <br/>
//     <hr/>
//     </div>
//   );
// }
// export default Contact;

import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
// Picker
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';

function DatePickerWrapper(props) {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props;
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <DatePicker
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value === '' ? null : value}
    />
  );
}

function TimePickerWrapper(props) {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props;
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <TimePicker
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value === '' ? null : value}
    />
  );
}

const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};
const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  return errors;
};

function Contact() {
  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <Form
        onSubmit={onSubmit}
        initialValues={{ employed: true, stooge: 'larry' }}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="firstName"
                    component={TextField}
                    type="text"
                    label="First Name"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="lastName"
                    component={TextField}
                    type="text"
                    label="Last Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="email"
                    fullWidth
                    required
                    component={TextField}
                    type="email"
                    label="Email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    label="Employed"
                    control={
                      <Field
                        name="employed"
                        component={Checkbox}
                        type="checkbox"
                      />
                    }
                  />
                </Grid>
                <Grid item>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Best Stooge</FormLabel>
                    <RadioGroup row>
                      <FormControlLabel
                        label="Larry"
                        control={
                          <Field
                            name="stooge"
                            component={Radio}
                            type="radio"
                            value="larry"
                          />
                        }
                      />
                      <FormControlLabel
                        label="Moe"
                        control={
                          <Field
                            name="stooge"
                            component={Radio}
                            type="radio"
                            value="moe"
                          />
                        }
                      />
                      <FormControlLabel
                        label="Curly"
                        control={
                          <Field
                            name="stooge"
                            component={Radio}
                            type="radio"
                            value="curly"
                          />
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Sauces</FormLabel>
                    <FormGroup row>
                      <FormControlLabel
                        label="Ketchup"
                        control={
                          <Field
                            name="sauces"
                            component={Checkbox}
                            type="checkbox"
                            value="ketchup"
                          />
                        }
                      />
                      <FormControlLabel
                        label="Mustard"
                        control={
                          <Field
                            name="sauces"
                            component={Checkbox}
                            type="checkbox"
                            value="mustard"
                          />
                        }
                      />
                      <FormControlLabel
                        label="Salsa"
                        control={
                          <Field
                            name="sauces"
                            component={Checkbox}
                            type="checkbox"
                            value="salsa"
                          />
                        }
                      />
                      <FormControlLabel
                        label="Guacamole 🥑"
                        control={
                          <Field
                            name="sauces"
                            component={Checkbox}
                            type="checkbox"
                            value="guacamole"
                          />
                        }
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="notes"
                    component={TextField}
                    multiline
                    label="Notes"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="city"
                    component={Select}
                    label="Select a City"
                    formControlProps={{ fullWidth: true }}
                  >
                    <MenuItem value="London">London</MenuItem>
                    <MenuItem value="Paris">Paris</MenuItem>
                    <MenuItem value="Budapest">
                      A city with a very long Name
                    </MenuItem>
                  </Field>
                </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="alarm"
                      component={TimePickerWrapper}
                      fullWidth
                      margin="normal"
                      label="Alarm"
                    />
                  </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
            </Paper>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
}
export default Contact();