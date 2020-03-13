import React from 'react';
import firebase from 'firebase';
import authenticate from './authenticate.js';

 
export default function LoginButton() {
  return (
    <div className="Toggle">
      <button className="myButton" onClick={() => authenticate()}>
        Login
      </button>
    </div>);
}

