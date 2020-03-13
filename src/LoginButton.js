import React from 'react';
import firebase from 'firebase';
import authenticate from './authenticate.js';

 
function LoginButton() {
  

  return (
    <div class="Toggle">
    <button class="myButton" onClick={() => authenticate()}>
      Login
    </button></div>);
  }

export default LoginButton;
