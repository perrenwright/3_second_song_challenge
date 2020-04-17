import { setLocalToken, getLocalToken } from './token';
import React from 'react'

const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
    // eslint-disable-next-line
  }, []);
  return [value, setValue];
};

export default function GetToken() {
  // This function grabs the user's access token from the url so we can grab the information
  // about that user from the database.
  const [value, setValue] = useStateWithLocalStorage(
    'myValueInLocalStorage'
  );
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  e = r.exec(q);
  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
  }

  const token = hashParams.access_token;
  React.useEffect(() => {

    setValue(token)
    setLocalToken(value);
    console.log('Token: ', value);
    var local_token = getLocalToken();
    console.log('Local Storage token', local_token);
    // eslint-disable-next-line
  }, [token]);

  return token;
}


// const useStateWithLocalStorage = localStorageKey => {
//   const [value, setValue] = React.useState(
//     localStorage.getItem(localStorageKey) || ''
//   );
//   React.useEffect(() => {
//     localStorage.setItem(localStorageKey, value);
//     // eslint-disable-next-line
//   }, []);
//   return [value, setValue];
// };

// export default function GetToken() {
// const [value, setValue] = useStateWithLocalStorage(
//   'myValueInLocalStorage'
// );
//   // This function grabs the user's access token from the url so we can grab the information
//   // about that user from the database.
//   var hashParams = {};
//   var e,
//     r = /([^&;=]+)=?([^&;]*)/g,
//     q = window.location.hash.substring(1);
//   e = r.exec(q);
//   while (e) {
//     hashParams[e[1]] = decodeURIComponent(e[2]);
//     e = r.exec(q);
//   }
//   const token = hashParams.access_token;
//   React.useEffect(() => {

//     setValue(token)
//     setLocalToken(value);
//     console.log('Token: ', value);
//     var local_token = getLocalToken();
//     console.log('Local Storage token', local_token);
//     // eslint-disable-next-line
//   }, [token]);

//   return token;


