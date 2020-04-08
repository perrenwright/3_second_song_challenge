import React from 'react';
import {Button,withStyles} from '@material-ui/core';
import authenticate from '../authenticate';


const StyledButton = withStyles({
  root: {
    background: '#19869E',
    borderRadius: 10,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(250, 250, 250, 250)',
    marginRight: '80%',
    top: '10px',

  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

function EndPage({score}) {
  return (
    <div className="LandingPage">
      <font color="black">
      <h1> {score} </h1>
      </font>
    </div>
  );
}

export default EndPage;

