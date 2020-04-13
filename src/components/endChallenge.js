import React from 'react';
import {Button,withStyles} from '@material-ui/core';
import authenticate from '../authenticate';
import { getChallengeUtil } from '../getChallengeUtil';
import PlayChallenge from './playChallenge.js';
import {useState,useEffect} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { getLocalToken } from '../token';
import firestoreRef from '../firebase';
import Swal from 'sweetalert2'


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


// spotifyApi.getPlaylist(playlist_id).then(function (data) {
//   // 'data' is the vaiable that has all the information about the playlist.
//   var all_tracks_info = data.tracks['items'];
//   var playlist_name = data.name;
//   var playlist_owner = data.owner.display_name;
//   var playlist_image = data.images[0].url;



function EndPage({score, high_score, challenge_id}) {
  // Send Score and Player to Database
  const [username, updateUsername] = useState(undefined);
  useEffect(() => {
    const getUsername = async () => {
      var token = getLocalToken();
      var spotifyApi = new SpotifyWebApi();
      spotifyApi.setAccessToken(token);
      console.log("this is me", spotifyApi.getMe())
      const username = await spotifyApi.getMe()  
      updateUsername(username["id"]);
      console.log(username["id"])
    }
    getUsername();
  }, []);
  function refreshPage() {
    window.location.reload(false);
  }

  if (score > high_score && username)
  {
    Swal.fire({
    title: 'Sweet!',
    text: username.concat(', You have the HIGH SCORE'),
    imageUrl: 'https://unsplash.it/400/200',
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Custom image',
  })
    console.log(username)
    if (challenge_id){
    firestoreRef.collection('challenge_test').doc(challenge_id.toString()).update({
      highest_score: score ,
      highest_scorer: username,
    });
  }
  }
  // I provide a nice looking alert if the user gets the high score and we update the challenge high scorer.
  return (
    <div className="LandingPage">
      <Button  onClick={refreshPage}>
        Return to challenges
      </Button>
      <font color="black">
      <h1> {username} your score is {score} </h1>
      </font>
    </div>
  );
}

export default EndPage;

