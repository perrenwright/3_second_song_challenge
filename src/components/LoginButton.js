import React from 'react';
import authenticate from '../authenticate.js';

export default function LoginButton() {
  return (
    <div className="Toggle">
      <button className="myButton" onClick={() => authenticate()}>
        Login
      </button>
    </div>
  );
}
