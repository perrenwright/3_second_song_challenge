import React, { useState, useEffect } from 'react';
import { Button, withStyles } from '@material-ui/core';
import GetToken from '../GetToken';
import authenticate from '../authenticate';
import SpotifyWebApi from 'spotify-web-api-js';
import createChallengeUtil from '../createChallengeUtil';
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
 
 console.log('Challenge function called');
 const [valid_playlists, setValidPlaylists] = useState({});
 
 var token = getLocalToken();
 
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
           <Button onClick={()=> handleclick(key)}>
             {valid_playlists[key]}
           </Button>

         ))}
        
       </div>
     </div>
   </div>
 );
}
export default Challenges;