import { setLocalToken, getLocalToken } from './token';


export default function getToken() {
  // This function grabs the user's access token from the url so we can grab the information
  // about that user from the database.
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  e = r.exec(q);
  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
  }

  var token = hashParams.access_token;
  if (token)
  {
    localStorage.setItem('localStorageKey', token);
  }else{token = localStorage.getItem('localStorageKey');}


  setLocalToken(token);
  console.log('Token: ', token);
  var local_token = getLocalToken();
  console.log('Local Storage token', local_token);
  return token;

}
