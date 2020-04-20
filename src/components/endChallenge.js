import React from 'react';
import {Button} from '@material-ui/core';
import {useState,useEffect} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { getLocalToken } from '../token';
import firestoreRef from '../firebase';
import Swal from 'sweetalert2'


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
      updateUsername(username["display_name"]);
      console.log(username["display_name"])

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

