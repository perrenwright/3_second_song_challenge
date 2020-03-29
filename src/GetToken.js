import SpotifyWebApi from 'spotify-web-api-js';

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

  const token = hashParams.access_token;
  console.log('Token: ', token);
  return token;
}
