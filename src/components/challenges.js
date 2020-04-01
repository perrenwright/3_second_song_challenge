import React, { useState, useEffect } from 'react';
import { Button, withStyles } from '@material-ui/core';
import GetToken from '../GetToken';
import authenticate from '../authenticate';
import SpotifyWebApi from 'spotify-web-api-js';
import { getLocalToken } from '../token';
 
import './about.css';
 
const StyledButton = withStyles({
 root: {
   background: '#19869E',
   borderRadius: 10,
   border: 0,
   color: 'white',
   height: 48,
   width: 144,
   padding: '0 30px',
   boxShadow: '0 3px 5px 2px rgba(250, 250, 250, 250)',
   right: '575px'
 },
 label: {
   textTransform: 'capitalize'
 }
})(Button);
 
function Challenges() {
 // We will retrieve our token from localstorage if it has been stored here in a previous session.
 const [value, setValue] = React.useState(
  localStorage.getItem('myValueInLocalStorage') || ''
);
// Here I am just checking to see if we need to retrieve a new token or not.
 if (value === "undefined"){
  var token = getLocalToken();
 }
 else{
    var token = value;
 }
 // This block detects if the user refreshes the page and stores the current token if so.
  window.onbeforeunload = (e) => {
  // I'm about to refresh! do something...
  localStorage.setItem('myValueInLocalStorage', token)
          setValue(token);
  };

 console.log('Challenge function called');
 const [valid_playlists, setValidPlaylists] = useState({});
 
 var spotifyApi = new SpotifyWebApi();
 spotifyApi.setAccessToken(token);
 
 useEffect(() => {
  async function setValidPlaylistsFn() {
  let updatedValidPlaylists = [];
  await spotifyApi.getUserPlaylists().then(function(data) {
    console.log('User playlists', data['items']);
    console.log("spotifyApi.getUserPlaylists");
    for (var i in data['items']) {
    // console.log(data['items'][i]);
      var playlist_info = data['items'][i];
      updatedValidPlaylists[playlist_info['id']] = playlist_info['name'];
      console.log(playlist_info['id'], playlist_info['name']);
    }
    // state does not actually update until the end of useEffect, you can't update
    setValidPlaylists(updatedValidPlaylists);
  });
  }
  
  setValidPlaylistsFn();
  }, []);
 function createChallengeUtil(playlist_id) {
  var token = value;
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);

  spotifyApi.getPlaylistTracks(playlist_id).then(function(value) {
    var playlist_ref = value['items'];
    var all_tracks = [];
    for (var i = 0; i < playlist_ref.length; i++) {
      var track_name_and_id =
        playlist_ref[i].track.name + ' : ' + playlist_ref[i].track.id;
      all_tracks.push(track_name_and_id);
    }
    console.log(all_tracks);
    return all_tracks;
  });
}
 function handleclick(key)
 {
   return createChallengeUtil(key);
 }
 return (
   <div className="about">
     <div className="about-header">
       <div className="about-headerText">
         <h2> Challenges you can add</h2>
         <hr />
       {Object.keys(valid_playlists).map(key => (
           <Button onClick={() => handleclick(key)}>
             {valid_playlists[key]}
           </Button>
         ))}
       </div>
     </div>
   </div>
 );
}
export default Challenges;